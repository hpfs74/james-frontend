# Contributing

## Configure your environment

> TODO

## Setup Bitbucket account

- Use SSH (preferred) or HTTP
https://confluence.atlassian.com/bitbucket/set-up-ssh-for-git-728138079.html

- Enable two-step verification
https://confluence.atlassian.com/bitbucket/two-step-verification-777023203.html

- Setup configuration to sign commits with GPG
https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work

## Github Flow

- Anything in the master branch is deployable
- To work on something new, create a descriptively named branch off of master
- Commit to that branch locally and regularly push your work to the same named branch on the server
- When you need feedback or help, or you think the branch is ready for merging, open a pull request
- After someone else has reviewed and signed off on the feature, you can merge it into master
- Once it is merged and pushed to ‘master’, you can and should deploy immediately

Practically, this comes down to:

1. Checkout master and git pull latest changes
2. Create your feature branch: `$ git checkout -b feature/<Jira-ISSUE-ID>/description`
3. Make changes
4. Commit your changes with `$ git commit` and use the [https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit](Angular git message convention)
5. Rebase to master `$ git rebase master`
6. Fix any conflicts and add them and continue with `$ git rebase --continue`
7. Push your changes with `$ git push origin feature/<Jira-ISSUE-ID>/description`

Do not use `git push -f` but `git push --force-with-lease` instead as a safer alternative.
See https://developer.atlassian.com/blog/2015/04/force-with-lease/