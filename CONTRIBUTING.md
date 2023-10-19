# 🚀 Contributing Guidelines 🌟

Welcome to the exciting world of open-source contributions! 🎉 We're thrilled that you want to be a part of our project, and we appreciate your efforts to make it even better. Remember, in our world, there's no such thing as a contribution that's too small! 🌈

## 🤔 Need Help with the Basics? 🧐

Don't worry if you're new to Git and GitHub; we've got your back! Here are some resources to help you get started:

- 🍴 [Forking a Repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
- 🚀 [Creating Your First Pull Request](https://opensource.com/article/19/7/create-pull-request-github)
- 💻 [Getting Started with Git and GitHub](https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6)

If you ever feel lost, don't hesitate to reach out to our fantastic project mentors. They're here to help! 🌟

## 👩‍💻 Submitting Contributions

Let's get down to business! Here's how you can submit your contributions and join the fun:

### 🔍 Step 1: Find an Issue

- Dive into our existing issues, or if you're feeling adventurous, create one yourself!
- We'll assign an issue to you, so hang tight and wait for the green light. 🚦
- Remember, every change you make in this project should have an associated issue.

![Issue](https://user-images.githubusercontent.com/73248007/135501033-ac37f22d-cd96-4326-bf0b-7d0ed070b697.png)

### 🍽️ Step 2: Fork the Project

- Fork this Repository. It's like making a copy of your favorite dish, but for code! 🍴
- Keep a reference to the original project in the `upstream` remote. Here's how to do it:

```bash
git clone https://github.com/<your-username>/<repo-name>
cd <repo-name>
git remote add upstream https://github.com/<upstream-owner>/<repo-name>
```

![Fork](https://user-images.githubusercontent.com/73248007/135501084-3643da44-118d-4f7a-a8c7-05cef93296b7.png)

- If you've already forked the project, update your copy with these commands:

```bash
git remote update
git checkout <branch-name>
git rebase upstream/<branch-name>
```

### 🌿 Step 3: Branch Out

- Create a new branch to work on your contribution. The branch name should reflect the issue you're addressing.

```bash
# Create a branch and switch to it
git checkout -b branch_name
```

### 💼 Step 4: Work Your Magic

- Roll up your sleeves and work on the issue assigned to you. 🧙‍♂️
- Add all the necessary files and code changes.

```bash
# Add all your new files to the branch
git add .
# Or, if you prefer, add only specific files
git add <some files>
```

### ✍️ Step 5: Commit Your Work

- Leave a helpful and descriptive message for the reviewer. Think of it as the secret ingredient in your recipe for a great contribution.

```bash
# This message is your legacy; make it count
git commit -m "message"
```

- **NOTE**: Each Pull Request (PR) should ideally contain only one commit. Multiple commits should be squashed into one for a cleaner history.

### 🌍 Step 6: Share Your Brilliance

- Now it's time to share your work with the world. Upload your changes to your forked repository:

```bash
# Push your work to your remote repository
git push -u origin Branch_Name
```

- Your branch will look as awesome as this:

![Branch](https://user-images.githubusercontent.com/73248007/135501103-b446d342-70b3-451e-895e-52345eb7cb0e.png)

### 🎯 Step 7: The Grand Finale - Pull Request

- Hop over to your repository on your web browser and click on "compare and pull requests."
- Add a title and description to your pull request to tell the world about your brilliant contribution. 🌟

![PR](https://user-images.githubusercontent.com/73248007/135501122-6d3bde84-5a50-4baf-8be7-80a4e9f9d51a.png)

- Ta-da! Your Pull Request is submitted and will be reviewed by our fantastic moderators. Expect it to be merged with confetti and applause! 🎉🎉

Remember, every small step you take makes this project better, and we're grateful for your contribution. So, let's cook up something amazing together! 🍽️🚀