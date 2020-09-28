# Advval

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## deploy

node -- last stable version

'''bash
npm install -g @angular/cli
'''

iside of project folder -> ng build --project name

'''bash
npm i
ng build --prod --project users
'''

this command creates a dist folder and inside contains a folder for each of the construction projects

forlder structure ./dist/project name in this case ./dist/users

---

in the future, when contain more the 1 project the porject structure change and the entry point for all projet should be ./dist/advval an all routing redirection wil be charged form this folder

comand to nuild all project on the same time
'''bash
ng build --prod  
'''

if contain more the 1 project
'''bash
ng build --base-href=/users/ --project users # --project name
'''
