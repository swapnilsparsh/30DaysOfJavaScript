from huggingface_hub import login

import datasets
import tempfile
import logging
import random
import config
import os
import yaml
import time
import torch
import transformers
import pandas as pd
import jsonlines

from transformers import AutoTokenizer
from transformers import AutoModelForCausalLM
from transformers import TrainingArguments
from transformers import Trainer
# from llama import BasicModelRunner
model_name = "EleutherAI/pythia-70m"
max_steps = 3
from datasets import load_dataset
def tokenize_function(examples):
    if "patch" in examples and "oldf" in examples and "msg" in examples:
      text = examples["patch"][0] + examples["oldf"][0] + examples["msg"][0]
    elif "input" in examples and "output" in examples:
      text = examples["input"][0] + examples["output"][0]
    else:
      text = examples["text"][0]

    tokenizer.pad_token = tokenizer.eos_token
    tokenized_inputs = tokenizer(
        text,
        return_tensors="np",
        padding=True,
    )

    max_length = min(
        tokenized_inputs["input_ids"].shape[1],
        4096
    )
    tokenizer.truncation_side = "left"
    tokenized_inputs = tokenizer(
        text,
        return_tensors="np",
        truncation=True,
        max_length=max_length
    )

    return tokenized_inputs

token = "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"
login(token = token)
# tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-hf", token='my token')
# tokenizer = transformers.AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-hf", token=token)
tokenizer = transformers.AutoTokenizer.from_pretrained("EleutherAI/pythia-70m")
path_ds = "/Users/reda.hossino/Documents/X2/aiTestProject/AITrainModel/data/cls-train-js/*.json"
#"/Users/reda.hossino/Documents/X2/aiTestProject/AITrainModel/data/cls-train-js/data/output_1copy2.jsonl.txt"

#data_path = Path('/kaggle/input/otto-recommender-system/')

#test = data_path / 'test.jsonl'

#train = data_path / 'train.jsonl'
dataset = load_dataset("json", data_files= str(path_ds))
print(dataset['train'][3])
tokenized_dataset = dataset.map(
    tokenize_function,
    batched=True,
    batch_size=1,
    drop_last_batch=True
)

print(tokenized_dataset['train'][3])

tokenized_datasets_split = tokenized_dataset["train"].train_test_split(test_size=0.1, shuffle=True, seed=123)
train_dataset = tokenized_datasets_split['train']
test_dataset = tokenized_datasets_split['test']
print(tokenized_datasets_split)
print(train_dataset.info)
print("test_dataset")
print(test_dataset.info)
