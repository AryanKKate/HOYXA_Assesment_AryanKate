# Contributing to Project

## GitHub Workflow Guidelines

### Branch Naming Conventions
- Use the prefix `Fix/` for any bug fixes.
- Example: `Fix/issue-123`.

### Pull Request Requirements
- Ensure that your branch is up-to-date with the base branch.
- Include a clear and descriptive title for your pull request.
- Provide a concise description of the changes made and reference any related issues.

### Rebase Workflow
- Before creating your pull request, rebase your changes onto the latest version of the base branch.
- To do this, run the following command:
  ```
  git fetch origin
  git rebase origin/main
  ```
- Resolve any conflicts that arise during the rebase. After resolving, continue the rebase with:
  ```
  git rebase --continue
  ```
- Finally, force-push your branch after rebasing:
  ```
  git push origin <your-branch-name> --force
  ```