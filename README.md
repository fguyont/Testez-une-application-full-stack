# Yoga

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## Prerequisites

- Download and install MySQLServer and MySQLWorkbench. Take note of your login and your password.
- Download Maven and configure your environment variables in order to use 'mvn' commands.

## Database setup

- With MySQLWorkbench, create a new schema named "test". Set it as default schema.
- Run this script:
> https://github.com/OpenClassrooms-Student-Center/Testez-une-application-full-stack/blob/master/ressources/sql/script.sql

## Get the source code

> git clone https://github.com/fguyont/Testez-une-application-full-stack.git

## Back-end setup and run

- Open this file
https://github.com/fguyont/Testez-une-application-full-stack/blob/master/back/src/main/resources/application.properties
- Insert your SQLServer login and password for these lines:
> spring.datasource.username=
> spring.datasource.password=

- Go inside folder named back
> cd back
- Run the project
> mvn spring-boot:run

## Front-end setup and run

- Go inside folder front 
> cd front
- Install dependencies 
> npm install
- Run the project 
> npm start
- The application opens here http://localhost:4200
- Try to log in with this account:
> email: yoga@studio.com
> password: test!1234

## Front-end testing

- Stop the application run and go inside front folder
- Run front-end tests
> npx jest --coverage
- Coverage report: 
> /Testez-une-application-full-stack/front/coverage/jest/lcov-report/index.html

## End-to-end testing

- Run end-to-end tests
> npm run e2e
- Generate coverage file (only if e2e tests had been run before)
> npm run e2e:coverage
- With Cypress browser, run the file named all-tests.cy.ts in order to get the coverage for all this project end-to-end tests.
- Coverage report: 
> /Testez-une-application-full-stack/front/coverage/lcov-report/index.html

## Back-end testing

- Go inside back folder
- Run back-end tests
> npm clean test
- Coverage report: 
> /Testez-une-application-full-stack/back/target/site/jacoco/index.html

- After each back-end test run, you will need to drop the schema and create a new one because of the used ids in API calls in back-end integration tests.

## Author

Frédéric Guyont
 
