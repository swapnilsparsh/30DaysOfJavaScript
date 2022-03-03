# Contributing Guidelines

This documentation contains a set of guidelines to help you during the contribution process.
We are happy to welcome all the contributions from anyone willing to improve/add new scripts to this project.
Thank you for helping out and remember, **no contribution is too small.**


## Need some help regarding the basics?🤔


You can refer to the following articles on basics of Git and Github and also contact the Project Mentors,
in case you are stuck:

- [Forking a Repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
- [Cloning a Repo](https://help.github.com/en/desktop/contributing-to-projects/creating-an-issue-or-pull-request)
- [How to create a Pull Request](https://opensource.com/article/19/7/create-pull-request-github)
- [Getting started with Git and GitHub](https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6)
- [Learn GitHub from Scratch](https://lab.github.com/githubtraining/introduction-to-github)

## Submitting Contributions👩‍💻👨‍💻

Below you will find the process and workflow used to review and merge your changes.

### Step 0 : Find an issue

- Take a look at the Existing Issues or create your **own** Issues!
- Wait for the Issue to be assigned to you after which you can start working on it.
- Note : Every change in this project should/must have an associated issue.

![Issue](https://user-images.githubusercontent.com/73248007/135501033-ac37f22d-cd96-4326-bf0b-7d0ed070b697.png)


### Step 1 : Fork the Project

- Fork this Repository. This will create a Local Copy of this Repository on your Github Profile.
Keep a reference to the original project in `upstream` remote.  

```bash
git clone https://github.com/<your-username>/<repo-name>  
cd <repo-name>  
git remote add upstream https://github.com/<upstream-owner>/<repo-name>  
```  
![Fork](https://user-images.githubusercontent.com/73248007/135501084-3643da44-118d-4f7a-a8c7-05cef93296b7.png)



- If you have already forked the project, update your copy before working.

```bash
git remote update
git checkout <branch-name>
git rebase upstream/<branch-name>
```  

### Step 2 : Branch

Create a new branch. Use its name to identify the issue your addressing.

```bash
# It will create a new branch with name Branch_Name and switch to that branch 
git checkout -b branch_name
```

### Step 3 : Work on the issue assigned

- Work on the issue(s) assigned to you.
- Add all the files/folders needed.
- After you've made changes or made your contribution to the project add changes to the branch you've just created by:

```bash  
# To add all new files to branch Branch_Name  
git add .  
# To add only a few files to Branch_Name
git add <some files>
```

### Step 4 : Commit

- To commit give a descriptive message for the convenience of reviewer by:

```bash
# This message get associated with all files you have changed  
git commit -m "message"  
```

- **NOTE**: A PR should have only one commit. Multiple commits should be squashed.

### Step 5 : Work Remotely

- Now you are ready to your work to the remote repository.
- When your work is ready and complies with the project conventions, upload your changes to your fork:

```bash  
# To push your work to your remote repository
git push -u origin Branch_Name
```

- Here is how your branch will look.
![Branch](https://user-images.githubusercontent.com/73248007/135501103-b446d342-70b3-451e-895e-52345eb7cb0e.png)


### Step 6 : Pull Request

- Go to your repository in browser and click on compare and pull requests.
Then add a title and description to your pull request that explains your contribution.  

![PR](https://user-images.githubusercontent.com/73248007/135501122-6d3bde84-5a50-4baf-8be7-80a4e9f9d51a.png)

- Yay, Your Pull Request has been submitted and will be reviewed by the moderators and merged.
    

