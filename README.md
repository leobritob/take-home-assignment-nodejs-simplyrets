# Task Home Assignment Node.js

## Decisions

- Choose `TypeScript` because it is a popular language among Node.js developer and it has a lot of features that help developer a good software;
- Choose `zod` as request validator because it is TypeScript-first schema wth static type inference, which is amazing for our project;
- Chose `TypeORM` because is an amazing ORM for TypeScript projects with a lot of features that help us to manipulate our database;
- Installed `express-async-errors` in order to handle all async exceptions and to get back a friendly message to the user;
- Created a `controller` in order to validate and handle all incoming requests and then send them to the service layer;

## Project structure

| Folder                 | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| src                    |                                                                      |
| src/controllers        | Handle and validate all incoming request, and call the service layer |
| src/data               | All seed json files                                                  |
| src/entities           | All TypeORM entities                                                 |
| src/routes             | All HTTP routes files and its respective e2e test                    |
| src/services           | All service file that handle ORM repositories                        |
| src/shared             |                                                                      |
| src/shared/exceptions  | All custom exceptions                                                |
| src/shared/validations | All custom validations                                               |

## Clock report

```
10:30 am
- Configuring editorconfig and prettier
- Installing nodemon and set it up
- Setting up watch mode on jest
- Setting up the CRUD methods in the Property services
- Starting to write unit tests for each service methods

11:00 am
- Setting up test coverage
- Still working on unit tests
- Creating the Property controller
- Setting up each controller action with each specific Property service method
- Creating unit tests for Property controller
- Changing each controller actions to use both `req` and `res` objects

11:30 am
- Still changing each controller actions to use both `req` and `res` objects
- Setting up each controller action in each specific HTTP route
- Improving PropertyRoutes unit tests

11:45 am
- Break to prepare lunch and have it

01:15 pm
- Still working on improving PropertyRoutes unit tests
- Installing zod library
- Setting up Property DTO
- Create enum for each type of Property
- Create request validation for creation
- Create request validation for updation
- Updating unit tests

02:00 pm
- Adding global error handling
- Changing bodyParse to express.json
- Creating custom exceptions
- Updating services with custom exceptions
- Updating unit tests

03:00 pm
- Creating pagination filter
- Creating address filter
- Creating type filter
- Creating Property bedrooms filter
- Creating Property bathrooms filter
- Creating Property price greater than or equal filter
- Creating Property price lower than or equal filter

03:30 pm
- Writing README.md
- TIME IS OVER ):

```

## Requirements

- Node.js 16+
- yarn

## How to run

```bash
# Install all dependencies
$ yarn install

# Run project as development mode
$ yarn dev

# Run project as production mode
$ yarn start
```

## Tests

```bash
# Run unit and integration tests
$ yarn test

# Run unit test in watching mode
$ yarn test:watch

# Run coverage test
$ yarn test:coverage
```

## Rodamp

- Installing and setting up Swagger
- Creating indexes to improve sql query performance
- Write more scenarios test
- ...
