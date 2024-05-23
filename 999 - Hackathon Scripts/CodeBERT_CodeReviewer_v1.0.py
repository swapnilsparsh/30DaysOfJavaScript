import requests
from torch import nn
from torch.nn import CrossEntropyLoss
from transformers import AutoTokenizer, T5ForConditionalGeneration, AutoModelForSeq2SeqLM, T5Config
import torch
import re
import argparse

def post_github_general_comment(input_string, repo, user, token, pr_id):
    # Define the GitHub API endpoint for the PR comments
    url = f"https://api.github.com/repos/{user}/{repo}/issues/{pr_id}/comments"
    payload = {
        "body": input_string
    }
    response = requests.post(url, json=payload, auth=(user, token))
    if response.status_code == 201:
        print(f"Comment posted successfully on PR {pr_id}")
    else:
        print(f"Failed to post comment on PR {pr_id}")

def post_github_comments(input_string, repo, user, token, pr_id, file_path, code_diff):
    print("input_string:"+input_string)
    print("pr_id:"+str(pr_id)) 
    print("file_path:"+file_path)
    print("code_diff:"+code_diff)
    print("repo:"+repo)
    print("user:"+user)
    print("token:"+token)   
    # Define the GitHub API endpoint for the PR comments
    print("post review comment to PR")
    url = f"https://api.github.com/repos/{user}/{repo}/pulls/{pr_id}/comments"
    commitId = get_commit_id_for_file_in_pr(user, repo, pr_id, file_path, token)
    #code_diff = "@@ -33,6 +33,28 @@ describe \"Bolt::Outputter::JSON\" do\n"
    print("code_diff review comment to PR commitId" + commitId)    
    code_line = re.search('@@(.*)@@', code_diff)

    if code_line:
        print("code_line : " +file_path)
        lines = code_line.group(1).split(',');
        line_start = lines[0] 
        line_length = lines[1].split(' ')[0]
        code_line_int = abs(int(line_start.replace(" ","")))
        line_length_int = abs(int(line_length.replace(" ","")))
        line = code_line_int + 3
        print("code_line_int : " + str(code_line_int))    
        print("code_line_int : " + str(line_length_int))   
        # Prepare the comment payload
        payload = {
            "body": input_string,
            "path": file_path,
            "line": line,
            "commit_id": commitId
        }

        # Make the POST request to the GitHub API
        response = requests.post(url, json=payload, auth=(user, token))
        if response.status_code == 201:
            print(f"Comment posted successfully on {file_path} at line {line}")
        else:
            print(f"Failed to post comment on {file_path} at line {line}. Response: {response.content}")
    else:
        print(f"general comment posted successfully on {file_path}")
        post_github_general_comment(input_string, repository, user, token, pr_id)

def get_commit_id_for_file_in_pr(owner, repo, pr_number, file_path, token):
    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.v3+json'
    }
    
    # Get list of commits in the pull request
    commits_url = f'https://api.github.com/repos/{owner}/{repo}/pulls/{pr_number}/commits'
    commits_response = requests.get(commits_url, headers=headers)
    
    if commits_response.status_code != 200:
        raise Exception(f"Error fetching commits: {commits_response.status_code}, {commits_response.text}")

    commits = commits_response.json()
    commits.reverse()
    for commit in commits:
        sha = commit['sha']
        
        # Get details of each commit
        commit_url = f'https://api.github.com/repos/{owner}/{repo}/commits/{sha}'
        commit_response = requests.get(commit_url, headers=headers)
        
        if commit_response.status_code != 200:
            raise Exception(f"Error fetching commit details: {commit_response.status_code}, {commit_response.text}")

        commit_details = commit_response.json()
        print("commit_details : ")
        print(commit_details)
        # Check if the specific file is in this commit
        for file in commit_details['files']:
            if file['filename'].replace(" ", "") == file_path.replace(" ", ""):
                return sha
    
    return None
    
MAX_SOURCE_LENGTH = 512


class ReviewerModel(T5ForConditionalGeneration):

    def __init__(self, config):
        super().__init__(config)
        self.cls_head = nn.Linear(self.config.d_model, 2, bias=True)
        self.init()

    def init(self):
        nn.init.xavier_uniform_(self.lm_head.weight)
        factor = self.config.initializer_factor
        self.cls_head.weight.data.normal_(mean=0.0, \
                                          std=factor * ((self.config.d_model) ** -0.5))
        self.cls_head.bias.data.zero_()

    def forward(
            self, *argv, **kwargs
    ):
        r"""
        Doc from Huggingface transformers:
        labels (:obj:`torch.LongTensor` of shape :obj:`(batch_size,)`, `optional`):
            Labels for computing the sequence classification/regression loss. Indices should be in :obj:`[-100, 0, ...,
            config.vocab_size - 1]`. All labels set to ``-100`` are ignored (masked), the loss is only computed for
            labels in ``[0, ..., config.vocab_size]``
        Returns:
        Examples::
            >>> from transformers import T5Tokenizer, T5ForConditionalGeneration
            >>> tokenizer = T5Tokenizer.from_pretrained('t5-small')
            >>> model = T5ForConditionalGeneration.from_pretrained('t5-small')
            >>> # training
            >>> input_ids = tokenizer('The <extra_id_0> walks in <extra_id_1> park', return_tensors='pt').input_ids
            >>> labels = tokenizer('<extra_id_0> cute dog <extra_id_1> the <extra_id_2>', return_tensors='pt').input_ids
            >>> outputs = model(input_ids=input_ids, labels=labels)
            >>> loss = outputs.loss
            >>> logits = outputs.logits
            >>> # inference
            >>> input_ids = tokenizer("summarize: studies have shown that owning a dog is good for you", return_tensors="pt").input_ids  # Batch size 1
            >>> outputs = model.generate(input_ids)
            >>> print(tokenizer.decode(outputs[0], skip_special_tokens=True))
            >>> # studies have shown that owning a dog is good for you.
        """
        if "cls" in kwargs:
            assert (
                    "input_ids" in kwargs and \
                    "labels" in kwargs and \
                    "attention_mask" in kwargs
            )
            return self.cls(
                input_ids=kwargs["input_ids"],
                labels=kwargs["labels"],
                attention_mask=kwargs["attention_mask"],
            )
        if "input_labels" in kwargs:
            assert (
                    "input_ids" in kwargs and \
                    "input_labels" in kwargs and \
                    "decoder_input_ids" in kwargs and \
                    "attention_mask" in kwargs and \
                    "decoder_attention_mask" in kwargs
            ), "Please give these arg keys."
            input_ids = kwargs["input_ids"]
            input_labels = kwargs["input_labels"]
            decoder_input_ids = kwargs["decoder_input_ids"]
            attention_mask = kwargs["attention_mask"]
            decoder_attention_mask = kwargs["decoder_attention_mask"]
            if "encoder_loss" not in kwargs:
                encoder_loss = True
            else:
                encoder_loss = kwargs["encoder_loss"]
            return self.review_forward(input_ids, input_labels, decoder_input_ids, attention_mask,
                                       decoder_attention_mask, encoder_loss)
        return super().forward(*argv, **kwargs)

    def cls(
            self,
            input_ids,
            labels,
            attention_mask,
    ):
        encoder_outputs = self.encoder( \
            input_ids=input_ids,
            attention_mask=attention_mask,
            output_attentions=False,
            return_dict=False
        )
        hidden_states = encoder_outputs[0]
        first_hidden = hidden_states[:, 0, :]
        first_hidden = nn.Dropout(0.3)(first_hidden)
        logits = self.cls_head(first_hidden)
        loss_fct = CrossEntropyLoss()
        if labels != None:
            loss = loss_fct(logits, labels)
            return loss
        return logits

    def review_forward(
            self,
            input_ids,
            input_labels,
            decoder_input_ids,
            attention_mask,
            decoder_attention_mask,
            encoder_loss=True
    ):
        encoder_outputs = self.encoder( \
            input_ids=input_ids,
            attention_mask=attention_mask,
            output_attentions=False,
            return_dict=False
        )
        hidden_states = encoder_outputs[0]
        decoder_inputs = self._shift_right(decoder_input_ids)
        # Decode
        decoder_outputs = self.decoder(
            input_ids=decoder_inputs,
            attention_mask=decoder_attention_mask,
            encoder_hidden_states=hidden_states,
            encoder_attention_mask=attention_mask,
            output_attentions=False,
            return_dict=False
        )
        sequence_output = decoder_outputs[0]
        if self.config.tie_word_embeddings:  # this is True default
            sequence_output = sequence_output * (self.model_dim ** -0.5)
        if encoder_loss:
            # print(self.encoder.get_input_embeddings().weight.shape)
            cls_logits = nn.functional.linear(hidden_states, self.encoder.get_input_embeddings().weight)
            # cls_logits = self.cls_head(hidden_states)
        lm_logits = self.lm_head(sequence_output)
        if decoder_input_ids is not None:
            lm_loss_fct = CrossEntropyLoss(ignore_index=0)  # Warning: PAD_ID should be 0
            loss = lm_loss_fct(lm_logits.view(-1, lm_logits.size(-1)), decoder_input_ids.view(-1))
            if encoder_loss and input_labels is not None:
                cls_loss_fct = CrossEntropyLoss(ignore_index=-100)
                loss += cls_loss_fct(cls_logits.view(-1, cls_logits.size(-1)), input_labels.view(-1))
            return loss
        return cls_logits, lm_logits


def prepare_models():
    tokenizer = AutoTokenizer.from_pretrained("microsoft/codereviewer")

    tokenizer.special_dict = {
        f"<e{i}>": tokenizer.get_vocab()[f"<e{i}>"] for i in range(99, -1, -1)
    }
    tokenizer.mask_id = tokenizer.get_vocab()["<mask>"]
    tokenizer.bos_id = tokenizer.get_vocab()["<s>"]
    tokenizer.pad_id = tokenizer.get_vocab()["<pad>"]
    tokenizer.eos_id = tokenizer.get_vocab()["</s>"]
    #tokenizer.msg_id = tokenizer.get_vocab()["<msg>"]
    tokenizer.keep_id = tokenizer.get_vocab()["<keep>"]
    tokenizer.add_id = tokenizer.get_vocab()["<add>"]
    tokenizer.del_id = tokenizer.get_vocab()["<del>"]
    tokenizer.start_id = tokenizer.get_vocab()["<start>"]
    tokenizer.end_id = tokenizer.get_vocab()["<end>"]

    config = T5Config.from_pretrained("microsoft/codereviewer")
    model = ReviewerModel.from_pretrained("microsoft/codereviewer", config=config)

    model.eval()
    return tokenizer, model


def pad_assert(tokenizer, source_ids):
    source_ids = source_ids[:MAX_SOURCE_LENGTH - 2]
    source_ids = [tokenizer.bos_id] + source_ids + [tokenizer.eos_id]
    pad_len = MAX_SOURCE_LENGTH - len(source_ids)
    source_ids += [tokenizer.pad_id] * pad_len
    assert len(source_ids) == MAX_SOURCE_LENGTH, "Not equal length."
    return source_ids


def encode_diff(tokenizer, diff, msg, source):
    difflines = diff.split("\n")[1:]  # remove start @@
    difflines = [line for line in difflines if len(line.strip()) > 0]
    map_dic = {"-": 0, "+": 1, " ": 2}

    def f(s):
        if s in map_dic:
            return map_dic[s]
        else:
            return 2

    labels = [f(line[0]) for line in difflines]
    difflines = [line[1:].strip() for line in difflines]
    inputstr = "<s>" + source + "</s>"
    #inputstr += "<msg>" + msg
    for label, line in zip(labels, difflines):
        if label == 1:
            inputstr += "<add>" + line
        elif label == 0:
            inputstr += "<del>" + line
        else:
            inputstr += "<keep>" + line
    source_ids = tokenizer.encode(inputstr, max_length=MAX_SOURCE_LENGTH, truncation=True)[1:-1]
    source_ids = pad_assert(tokenizer, source_ids)
    return source_ids


class FileDiffs(object):
    def __init__(self, diff_string):
        diff_array = diff_string.split("\n")
        self.file_name = diff_array[0]
        print("self.file_name : " + self.file_name)
        if(self.file_name and "a/" in self.file_name and "b/" in self.file_name):
            self.file_path = self.file_name.split("a/", 1)[1].rsplit("b/", 1)[0].rstrip()
            #self.file_path = self.file_path.split(" ")[0]
            self.diffs = list()
            for line in diff_array[4:]:
                if line.startswith("@@"):
                    self.diffs.append(str())
                if(self.diffs):
                    self.diffs[-1] += "\n" + line

def getFileUrl(pr_files,file_name):
    raw_url = ""
    for pr_file in pr_files:
        #print("pr_file:"+pr_file['filename'] + ", file_name:"+file_name)
        if pr_file['filename'].replace(" ", "") == file_name.replace(" ", ""):
            raw_url = pr_file['raw_url']
            #print("found")
            break
    return raw_url

def getFileCommit(pr_files,file_name):
    get_commit_id_for_file_in_pr
    sha = ""
    for pr_file in pr_files:
        #print("pr_file:"+pr_file['filename'] + ", file_name:"+file_name)
        if pr_file['filename'].replace(" ", "") == file_name.replace(" ", ""):
            sha = pr_file['sha']
            #print("found")
            break
    return sha

def review_pr(user, repository, pull_number, githubToken):
    tokenizer, model = prepare_models()
    pr_metadata = requests.get(F"https://api.github.com/repos/{user}/{repository}/pulls/{pull_number}").json()

    # Get diff and commit metadata from GitHub API
    #commit_metadata = requests.get(F"https://api.github.com/repos/{user}/{repository}/commits/{commit}").json()
    #diff_metadata = requests.get(pr_metadata["diff_url"]).json()
    url = F"https://patch-diff.githubusercontent.com/raw/{user}/{repository}/pull/{pull_number}.diff"
    #diff_metadata = requests.get(pr_metadata["diff_url"],headers={"Accept": "application/vnd.github.diff"})
    diff_metadata = requests.get(url,headers={"Accept": "application/vnd.github.diff"}).text
    msg = ""#pr_metadata["body"]#commit_metadata["commit"]["message"]
    #diff_data = requests.get(F"https://api.github.com/repos/{user}/{repository}/commits/{commit}",
                             #headers={"Accept": "application/vnd.github.diff"})
    code_diff = diff_metadata#diff_data.text
    f = open("source22.txt", "a")
    f.write(code_diff)
    f.close()
    pr_files = requests.get(F"https://api.github.com/repos/{user}/{repository}/pulls/{pull_number}/files").json()
    # Parse diff into FileDiffs objects
    files_diffs = list()
    for file in code_diff.split("diff --git"):
        if len(file) > 0:
            file_name = file.split("\n")[0]
            isValidFileName =file_name  and "a/" in file_name and "b/" in file_name:
            if(isValidFileName):
                fd = FileDiffs(file)
                files_diffs.append(fd)
    # Generate comments for each diff
    output = ""
    for fd in files_diffs:
        print(" fs : ")
        print(fd)
        output += F"File:{fd.file_path}\n"
        #file_url = getFileUrl(pr_files, fd.file_path)
        if(fd.file_path):
            # source = requests.get(F"https://raw.githubusercontent.com/{user}/{repository}/^{pull_number}/extensions/git/src/api/api1.ts").text
            
            #source = requests.get(file_url).text
            #source = requests.get(F"https://api.github.com/repos/{user}/{repository}/contents/{fd.file_path}").text
            source = requests.get(F"https://raw.githubusercontent.com/{user}/{repository}/master/{fd.file_path}").text
            #source = "404: Not Found"
            #print("source:"+len(source)+", msg::::"+msg)
            for diff in fd.diffs:
                #print("diff:"+diff)             
                inputs = torch.tensor([encode_diff(tokenizer, diff, msg, source)], dtype=torch.long).to("cpu")
                inputs_mask = inputs.ne(tokenizer.pad_id)
                logits = model(
                    input_ids=inputs,
                    cls=True,
                    attention_mask=inputs_mask,
                    labels=None,
                    use_cache=True,
                    num_beams=5,
                    early_stopping=True,
                    max_length=100
                )
                needs_review = torch.argmax(logits, dim=-1).cpu().numpy()[0]
                if not needs_review:
                    continue
                preds = model.generate(inputs,
                                    attention_mask=inputs_mask,
                                    use_cache=True,
                                    num_beams=5,
                                    early_stopping=True,
                                    max_length=100,
                                    num_return_sequences=2
                                    )
                preds = list(preds.cpu().numpy())
                pred_nls = [tokenizer.decode(_id[2:], skip_special_tokens=True, clean_up_tokenization_spaces=False)
                            for _id in preds]
                post_github_comments(pred_nls[0], repository, user, githubToken, pull_number, fd.file_path, diff)
                output += diff + "\n#######\nComment:\n#######\n" + pred_nls[0] + "\n#######\n"
    return output

def get_sum_of_nums(num1,num2,num3):
  return(int(num1)+int(num2)+int(num3))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Script that adds 3 numbers from CMD"
    )
    parser.add_argument("--user", required=True)
    parser.add_argument("--repository", required=True)
    parser.add_argument("--pullRequestId", required=True)
    parser.add_argument("--githubToken", required=True)
    args = parser.parse_args()

    user = args.user
    repository = args.repository
    pullRequestId = args.pullRequestId
    githubToken = args.githubToken
    print("user:"+user)
    print("repository:"+repository)
    print("pullRequestId:"+pullRequestId)
    print("githubToken:"+githubToken)
    ## post_github_comments("I think this should be `z = Math.random() * l`", repository, user, githubToken, 1, "05 - Random Password Generator/main.js", code_diff)
    comments = review_pr(user,repository, pullRequestId, githubToken)
    if("Comment:" not in comments):
        comments +=" code looks good"
        post_github_general_comment(comments, repository, user, githubToken, pullRequestId)
    print(comments)
