# Suse frontend assignment, WebGUI

## Get started

### Clone the repo

```shell
git clone https://github.com/francesco-torchia/frontend-coding-assign.git
cd frontend-coding-assign/src/frontend
```

### Install npm packages and Run application

Install the `npm` packages described in the `package.json` and run the application locally:

```shell
npm ci
npm run start
```

The `npm start` command builds (compiles TypeScript and copies assets) the application into `dist/`, watches for changes to the source files, and runs `lite-server` on port `4200`.

Shut it down manually with `Ctrl-C`.

### Npm scripts

These are the most useful commands defined in `package.json`:

* `npm run start` - runs the TypeScript compiler, asset copier, and a server at the same time.
* `npm run lint` - runs `eslint` on the project files.
* `ng serve` - runs `lite-server`.

These are the test-related scripts:

* `npm test` - builds the application and runs Intern tests (todo).
* `npm run ci` - cleans and builds the application.

### Environment

* `/src/environments/environment.ts` - edit this file to set environment settings for a dev server

```ts
export const environment = {
  production: false,
  restURL: 'http://localhost:3000',
  apiVersion: 'v1',
  jwtToken: 'jwtToken',
  languages: ['en', 'it'],
  defaultLanguage: 'en',
  gitHubHome: 'https://github.com/francesco-torchia/frontend-coding-assign',
};
```
