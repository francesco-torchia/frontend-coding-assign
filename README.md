# Frontend Coding Assignment - SUSE

In this repo you will find a MySQL database, dummy data and design documents (including
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

1. Please fork the project to complete your work. See https://docs.github.com/en/get-started/quickstart/fork-a-repo
   for details on working in a fork.
2. Once your work is completed, provide a link to the forked repository to
   asettle@suse.com

   **Important**: Do not open a PR directly against this repository. These
                  changes will not be accepted.

## Document Your Changes

If you have added or modified any user-facing functionality, such as CLI
commands or their output, then the pull request must include appropriate
updates to documentation.

## Writing Commit Messages

Git commit messages should start with a maxiumum 72 character or less
summary in a single paragraph, and prefixed with the module you are
changing. For example:

```
   backend: add initial README doc
   doc: fix a typo
```

The following paragraph(s) should explain the change in more detail; be
as specific as possible. If the commit message title was too short to
fully state what the commit is doing, use the body to explain not just the
"what", but also the "why".
