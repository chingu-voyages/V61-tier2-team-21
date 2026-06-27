## Principles

### Sync First

Before starting work each day or starting work on a new branch, ensure you run `git pull origin dev`, to ensure your `dev` branch is up to date.

Also run `git remote prune origin` to prune your local setup and remove branches that no longer exist on the remote.

### Short-lived Branches

Feature branches should be small and sharp, and branches should be deleted from the remote after a PR is merged.

This is another good time to run `git remote prune origin` to remove branches that no longer exist on the remote.

### Focused PRs

Try to keep each PR <200 lines of code, with a clear goal and a clear feature that was worked on.

## Example Workflow

```
Start:
- git checkout dev
- git pull origin dev
- git checkout -b feat/my-feature
```

```
During:
- Meaningful comments
- Commit frequently
- Run git pull origin dev again
- Resolve the conflicts you find locally
- Push and create the PR, request reviewes, add tags
```

```
After:
- Review your own and other's PRs
- Merge reviewerd PRs and delete stale branches
```

## Tooling Options

- A Git hook that runs a pre-push hook to pull `dev` and check for conflicts.
- Github Actions to automatically run tests, auto-label stale branches, and remind user to sync.
