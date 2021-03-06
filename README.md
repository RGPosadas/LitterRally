# Müll

- [Müll](#müll)
  - [Team Members](#team-members)
  - [Development Guidelines](#development-guidelines)
  - [Setting Up your Development Environment](#setting-up-your-development-environment)
    - [Environment](#environment)
    - [Enforcing Code Formatting and Standards](#enforcing-code-formatting-and-standards)
    - [Secrets and configuration](#secrets-and-configuration)
  - [Running Linting](#running-linting)
  - [Running Tests](#running-tests)
    - [Unit and UI Snapshot Tests](#unit-and-ui-snapshot-tests)
    - [E2E Tests](#e2e-tests)
  - [Running The Full Stack Application](#running-the-full-stack-application)
    - [Serving the application locally for development](#serving-the-application-locally-for-development)
    - [Running a local database for development](#running-a-local-database-for-development)
    - [Working with GraphQL on the Frontend](#working-with-graphql-on-the-frontend)
    - [Building and Serving the application for production](#building-and-serving-the-application-for-production)
    - [Populate database](#populate-database)
  - [Travis CI](#travis-ci)
    - [Scripts](#scripts)
  - [Troubleshooting](#troubleshooting)
    - [Failing Travis Builds](#failing-travis-builds)
    - [Package lock merge conflicts](#package-lock-merge-conflicts)
    - [Accessing a locally hosted dev build from your phone](#accessing-a-locally-hosted-dev-build-from-your-phone)
      - [Camera Issues](#camera-issues)

## Team Members

Müll is brought to you by members of `Team Bug bytes`.

- Ritchelle Grace Posadas, @RGPosadas (Team Lead)
- Cristian Aldea, @TheGreatMarkus
- Jonathan Hsu, @bit172
- Jimmy Lau, @JimLau49
- Cindy Lo, @cindyslittleplanet
- Omar Sahtout, @osahtout
- Yun Shi Lin, @ys-lin
- Leo Jr. Silao, @leojrsilao
- Ragith Sabapathipillai, @r-saba

## Development Guidelines

We try our best to adhere to the set of rules and guidelines that we've come up as a team to have an efficient workflow. To view our guidelines, refer to our [GitHub Wiki](https://github.com/RGPosadas/Mull/wiki).

## Setting Up your Development Environment

### Environment

We use **NodeJS 14**, **npm 6**, and Nx to manage our workspace and dependencies. The Nx CLI offers powerful tools for development, and we recommend you install it when contributing to the project.

1. Install NodeJS 14 for your operating system.
1. Install npm 6 (if it wasn't included in your NodeJS installation or you have a different version)
1. Install the Nx CLI:
   - `npm install -g nx`
1. Install dependencies:
   - `npm i`

### Enforcing Code Formatting and Standards

This project uses pre-commit to enforce formatting and standards. To make sure standards are followed, Travis fails commits which don't comply. This section will detail how to setup pre-commit locally.

1. [Install pre-commit](https://pre-commit.com/#install):
   - `pip install pre-commit`
1. Install the git hooks needed for pre-commit for every commit:
   - `pre-commit install`
1. Run pre-commit on all files:
   - `pre-commit run -a`
1. You're done! pre-commit will now run when you create a commit for our repository!

### Secrets and configuration

Some secrets and sensitive configuration files are needed to properly operate certains parts of the stack.

1. Add an `.env`file with the required credentials in the root of the project (see `docs-and-resources` channel on slack for credentials):

   ```properties
   TYPEORM_HOST=<host>
   TYPEORM_USERNAME=<username>
   TYPEORM_PASSWORD=<password>
   ...
   ```

1. Add a `cypress.env.json` in the `apps/mull-ui-e2e/` project folder. See `docs-and-resources` channel on slack for our secret key.

   ```properties
   {
      "ACCESS_TOKEN_SECRET": "<secret-key>"
   }
   ```

1. There is a `host.env.ts` under the `libs/types/src/` folder. This file specifies the hostnames where the applications are currently being hosted and makes it easy to change them. There are a few use cases for this, the most common being if you want to access the application you're hosting on your computer from another device, like your phone. We should not commit changes to this file.

1. Start the server and client dev server in another terminal to test that everything is working correctly.
   - `nx serve mull-api`
   - `nx serve mull-ui`
   - If you specified a host other than `localhost` in your `host.env.ts`, then make sure to add the `--host` flag so that the webserver can be configured properly to serve the app on the right host
     - example: `nx serve mull-ui --host 123.123.123.123`

## Running Linting

Linting is done through the [Nx CLI](https://nx.dev/latest/react/cli/lint), and uses ESLint.

To lint a project:

```bash
nx lint <project>
```

To lint all projects:

```bash
nx run-many --target=lint --all
```

To lint projects affected by your changes:

```bash
nx affected:lint --base=origin/<base-branch>
```

## Running Tests

### Unit and UI Snapshot Tests

Testing is done thought the [Nx CLI](https://nx.dev/latest/react/cli/test), and uses Jest as the main test runner. Unit tests for our ui project(s) also include snapshot tests using [React Test Renderer](https://reactjs.org/docs/test-renderer.html).

To test a project:

```bash
nx test <project>
```

To update the snapshots of a project:

```bash
nx test <project> --updateSnapshot
```

To test all projects:

```bash
nx run-many --target=test --all
```

To test a specific file:

```bash
nx test <project> --test-file <file-name>
```

To test projects affected by your changes:

```bash
nx affected:test --base=origin/<base-branch>
```

### E2E Tests

E2E testing is done thought the [Nx CLI](https://nx.dev/latest/react/cli/e2e), and uses [cypress](https://www.cypress.io/).

To run e2e tests for a project:

```bash
nx e2e <project>
```

To run e2e tests in watch mode:

```bash
nx e2e <project> --watch
```

To run e2e tests in headless mode:

```bash
nx e2e <project> --headless
```

To run e2e tests on projects affected by your changes:

```bash
nx affected:e2e --base=origin/<base-branch>
```

## Running The Full Stack Application

Our project is a full stack application which need multiple parts to run properly. This section will detail how to run the project for different usecases.

### Serving the application locally for development

1. Serve the front-end application:
   - `npm start mull-ui`
1. Serve the back-end application (in a different tab):
   - `npm start mull-api`

### Running a local database for development

You can serve the database locally for testing, and to avoid interfering with the dev/prod databases.

1. Install [docker](https://docs.docker.com/get-docker/) and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (or any similar SQL clients)
1. Start docker
1. Pull a `mysql` image. This image contains the information needed to spin up an instance of a mysql database using docker
   - `docker pull mysql:latest`
1. Create and run a MySQL container, which will run an instance of MySQL
   - `docker run --name mull-db -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:latest --default-authentication-plugin=mysql_native_password`
1. Start MySQL Workbench and test the connection with your database on `localhost:3306`. If the test was successful, connect to it
1. Update the following fields in your `.env`:
   - `root=localhost`
   - `password=password`, or whatever password you put for `MYSQL_ROOT_PASSWORD`
1. Using MySQL Workbench, create a new schema in your database called `mull-dev` (case sensitive). In order to support emojis, set `Character Set: utf8mb4` and `Collation: utf8mb4_unicode_ci`.

You now should have a functioning mysql database running locally, usable for the project!

To stop the container whilst keeping the database changes, run `docker stop mull-db`

### Working with GraphQL on the Frontend

1. Write your query/mutation into the respective `.gql` files located in `apps/mull-ui/src/graphql`
1. Run GraphQL Codegen:
   - `npm run gen-graphql`
1. Import hooks from `apps/mull-ui/src/generated/graphql.tsx`

### Building and Serving the application for production

1. Build the application for production:
   - `npm run build-ui && npm run build-api`
1. Serve the production frontend:
   1. Install `http-server` (or some other web server)
      - `npm i -g http-server`
   1. (Optional) Generate local SSL certificates for HTTPS
      - `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`
   1. Run a server locally:
      - `http-server dist/apps/mull-ui -p 8080 -c-1`
      - Add the `-S` option if using HTTPS
1. Serve the production backend:
   - `node dist/apps/mull-api/main.js`

### Populate database

You can populate the database with random values:

Prerequisite:

- Update the .env with what's on drive

seeding:

1. Start the database, if running locally
1. Run `npm run start mull-api` to update the columns (You don't have to have this running after updating)
1. Run `npm run seed:run`

For images to show on the app after seeding:

Download the Images from [the image folder in the drive](https://drive.google.com/drive/folders/1Czg2p3kZMvOyvrGpTfBH5bSq4sJVQZsJ?usp=sharing) and add them to the upload folder in mull-api.

This only needs to be done once and other images can be added.

## Travis CI

### Scripts

Scripts used for running checks on Travis CI can be found under the `scripts/` folder.

- `ci-checks.sh`: This script is meant to be run by Travis CI. It checks the trigger of the current build and run the appropriate checks.
- `check-all.sh`: This script runs lint, test and e2e checks on all projects. To run it:
  1. `bash scripts/check-all.sh`
- `check-affected.sh`: This script runs lint, test and e2e checks on affected projects. To run it:
  1. `export BASE_BRANCH=develop`, or some other base branch
  1. `bash scripts/check-affected.sh`

## Troubleshooting

### Failing Travis Builds

We are now caching `npm` and `pre-commit` for faster build times. However, it is possible for the cache to be spoiled with bad data, or can simply become invalid/obsolete. This would result in inconsistent, or even failed, Travis builds compared to local builds.

As a fix, try [clearing the Travis cache](https://docs.travis-ci.com/user/caching/#clearing-caches). Once cleared, re-run the builds.

### Package lock merge conflicts

When there are merge conflicts in the `package-lock.json` file, here are the general steps to take to fix them:

1. Delete the `package-lock.json` file
1. Temporarily remove the `preinstall` script in `package.json`. Installing packages with that script without the lock file won't work.
1. Run `npm i` to install the packages again and regenerate the `package-lock.json` file.
1. Put back the `preinstall` script you removed in step 2

### Accessing a locally hosted dev build from your phone

While you're developing the application, you might want to access the application from your phone. This would allow you to see how it looks on your device or test features such as the camera. Here are some general steps to do this, and some pitfalls to watch out for:

1. Change the value of your `host.env.ts` host to the IP address of your machine
1. Serve the backend/frontend applications with the `--host=your-ip-address` flag.
1. Doing these steps will allow other computers in your local network to access the application by visiting `http://your-ip-address:4200`.

#### Camera Issues

If you experience issues using the camera on your phone when doing the above steps, this might be due to a few factors. Namely, browsers, by default, don't allow javascript to access your camera over an insecure connection that isn't localhost. Since you're accessing the application through the `your-ip-address` hostname, the browser will no longer trust the application and might prevent certain features.

There are ways to remedy this, however. You can create a certificate and host the application over https.

You can also ask your browser to trust your machine's ip address, which might be simpler:

- Chrome: You can visit `chrome://flags/#unsafely-treat-insecure-origin-as-secure` on your browser (mobile or desktop works fine). You will see the `Insecure origins treated as secure` setting. Here, you can whitelist `http://your-ip-address:4200` (or other additional items as a comma-separated list), the browser will treat that origin as secure and will no longer block certain features.
