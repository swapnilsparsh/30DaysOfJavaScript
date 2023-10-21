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

### Step 1. Find an Issue
- Check our [Existing Issues](#) or create a new one if you have an idea.
- Wait for the issue to be assigned to you before you start working.
- Every change must have an associated issue:
![Issue](https://user-images.githubusercontent.com/73248007/135501033-ac37f22d-cd96-4326-bf0b-7d0ed070b697.png)


### Step 2. Fork the Project
- Fork the repository. This creates your local copy.
- Keep a reference to the original project (upstream).
- If you've already forked, update your copy before working:
![Fork](https://user-images.githubusercontent.com/73248007/135501084-3643da44-118d-4f7a-a8c7-05cef93296b7.png)

```bash
git clone https://github.com/<your-username>/<repo-name>
cd <repo-name>
git remote add upstream https://github.com/<upstream-owner>/<repo-name>
```

### Step 3. Create a Branch
- Create a new branch with a name that relates to the issue you're addressing.
- Work in this branch:
```bash
# To create a branch with name branch_name
git checkout -b branch_name
```

### Step 4 : Work on the issue assigned

- Work on the issue(s) assigned to you.
- Add all the files/folders needed.
- After you've made changes or made your contribution to the project add changes to the branch you've just created by:

```bash  
# To add all new files to branch Branch_Name  
git add .  
# To add only a few files to Branch_Name
git add <some files>
```

### Step 5 : Commit

- Provide a clear commit message.
- Each pull request (PR) should have only one commit; multiple commits should be squashed:

```bash
# This message get associated with all files you have changed  
git commit -m "Your descriptive message" 
```

- **NOTE**: A PR should have only one commit. Multiple commits should be squashed.

### Step 6 : Work Remotely

- Now you are ready to your work to the remote repository.
- When your work is ready and complies with the project conventions, upload your changes to your fork:

```bash  
# To push your work to your remote repository
git push -u origin Branch_Name
```

- Here is how your branch will look.
![Branch](https://user-images.githubusercontent.com/73248007/135501103-b446d342-70b3-451e-895e-52345eb7cb0e.png)


### Step 7 : Create a Pull Request

- Go to your repository on the web.
- Click on "Compare and Pull Requests."
- Add a title and description that explains your contribution.
- Your PR will be reviewed and merged by the moderators.
- That's it! Your contribution is on its way. Thanks for helping improve our project! 🚀  

![PR](https://user-images.githubusercontent.com/73248007/135501122-6d3bde84-5a50-4baf-8be7-80a4e9f9d51a.png)

- Yay, Your Pull Request has been submitted and will be reviewed by the moderators and merged.