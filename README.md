# frontend-coding-assign

You will be provided with a MySQL database, dummy data and design documents (including
function requirements). You are expected to develop SQL queries and APIs to address the
functional requirements and demonstrate the functionalities.

## Here are the steps: 

1. Create SQL queries needed to support functional requirements.
2. Install NodeJS and all the required packages.
3. Install postman application.
4. Write a NodeJS and Express application to connect to the database.
5. Add APIs to to support functional requirements.
6. Find a way to restrict access for some actions that need to be performed by a role. For example, some
   actions such as assigning a course to a teacher are performed by college staffs, pass and fail decisions
   are done by teachers.
7. Test and demonstrate results of executing your APIs using Postman application
8. Create a simple GUI for a user to interact with. 

# Contributing guidelines 

This document outlines how to contribute to this project.


## Clone the Source

You can clone from github with:

   git clone git@github.com:asettle/frontend-coding-assign.git

Or:

   git clone https://github.com/asettle/frontend-coding-assign


## Document Your Changes

If you have added or modified any user-facing functionality, such as CLI commands or their output,
then the pull request must include appropriate updates to documentation.

It is the submitter's responsibility to make the changes, and the reviewer's responsibility to make
sure they are not merging changes that do not have the needed updates to documentation.


## Writing Commit Messages

Git commit messages should start with a maxiumum 72 character or less summary in a single
paragraph, and prefixed with the module you are changing. For example:

```
   backend: add initial README doc
   doc: fix a typo
```

The following paragraph(s) should explain the change in more detail; be as specific as possible.
If the commit message title was too short to fully state what the commit is doing, use the body
to explain not just the "what", but also the "why".

Finally, it *must* include a `Signed-off-by:` line matching an email
address of the commit's author to comply with our need for a [Developer
Certificate of Origin (DCO)](https://developercertificate.org/). The DCO
is a lightweight way for contributors to certify that they wrote or
otherwise have the right to submit the code they are contributing to the
project. You can append this automatically to your commit message via
`git commit -s`. Our repository checks will refuse to accept the
commit otherwise.

For example:

```
   backend: add initial README doc

   This commit introduces the first README doc for aquarist-labs.

   Signed-off-by: Random Developer <random@developer.io>
```

If your changes addresses a bug or feature request, be sure to mention
them in the body of the commit message. [You can even close the issue
automatically!](https://github.blog/2013-01-22-closing-issues-via-commit-messages/)
For example:

```
   Fixes: #1

   Signed-off-by: Random Developer <random@developer.io>
```

## Pull Requests

### Pull Request Best Practices

PRs should be opened on branches contained in your fork of `asettle/frontend-coding-assign`. PRs should
target the `main` branch.

If your PR has only one commit, the PR title can be the same as the commit title (and GitHub will
suggest this). If the PR has multiple commits, do not accept the title GitHub suggests. Either use
the title of the most relevant commit, or write your own title.

## Contributor Guidelines

Do not merge directly into the `main` branch. It is protected for a reason.


## Be Respectful

Although technical in nature, the Open Source community is first and foremost
about people. Treat other people with respect. Be kind, be open, respect the
culture of the community you are interacting with and be aware of the diversity
of people in that community. Be aware that, particularly in electronic communication,
you might misunderstand or misinterpret what others are saying or meaning. The
reverse is also true.
