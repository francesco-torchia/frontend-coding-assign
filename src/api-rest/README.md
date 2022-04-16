# Suse frontend assignment, API REST

## Get started

### Clone the repo

```shell
git clone https://github.com/francesco-torchia/frontend-coding-assign.git
cd frontend-coding-assign/src/api-rest
```

### Install npm packages

Install the `npm` packages described in the `package.json`

```shell
npm ci
```

### Run, DEV mode

```shell
npm run dev
```

Runs the application in **DEV** mode. <br />
Use DEV mode if you want to test the application using Postman, without having to set the JwtToken in every http requests. <br />
The Role-based permissions will be based on `userId` query parameter.

#### Example:

```
/** Return all courses */

http://localhost:3000/courses?userId=1
```

Shut it down manually with `Ctrl-C`.

### Run, PROD mode

```shell
npm run build
npm run start
```

Runs the application in **PROD** mode. <br />
Use PROD mode if you want to run the application in combination with the webGUI. <br />
Jwt Authentication will be enabled. <br />
The Role-based permissions will be based on jwtToken.

#### Example:

```
/** Return all courses */

http://localhost:3000/courses

/** header: { 'Authorization', 'Bearer ${YourJwtToken}' */

```

Shut it down manually with `Ctrl-C`.

### Npm scripts

These are the most useful commands defined in `package.json`:

* `npm run build` - runs the TypeScript compiler. You will find the compiled app in `/dist` folder.
* `npm run start` - runs the the application in PROD mode.
* `npm run dev` - runs the TypeScript compiler and then runs the the application in DEV mode.
* `npm run lint` - runs `eslint` on the project files.

These are the test-related scripts:

* `npm test` - builds the application and runs Intern tests (todo).
* `npm run ci` - cleans and builds the application.

### Environment

* `src/env.json` - edit this file to set environment settings

```ts
{
  "app": {
    "hostname": "localhost",
    "port": 3000,
    "apiVersion": "v1",
    "httpLogLevel": "short",
    "logLevel": "info"
  },
  "db": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password" : "***",
    "database": "dev",
    "connectionLimit": 10
  },
  "auth": {
    "jwtTokenSecret": "***",
    "jwtTokenExpiresIn": "1d"
  }
}
```

### Postman Tests

To test the application, a complete set of collections is available in `/postman` folder. <br />

### MySql Troubleshooting

In case of authentication errors to the DB, during development, try to run the following commands in Mysql Workbench:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';
flush privileges;
```
