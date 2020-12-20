# FantasAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.

# Dependencies

Install nodejs:

    sudo apt-get install -y nodejs

Make sure you have successfully installed node.js and NPM on your system:

    node --version
    npm --version

Install dependencies listed in package.json with:

    npm install

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

## Deployment in Heroku

It is prepared to be deployed in heroku.
The file [server.js](server.js) is an express server (nodejs server) that forwards the request to the built angular app.
Heroku launches the nodejs (express server) through the existing [Procfile](Procfile) containing:

```
web: node server.js
```

The file [package.json](package.json) has been modified with the next changes:

```json
"scripts": {
    ...
    "start": "node server.js",
    ...
    "heroku-postbuild": "ng build --prod"
}

...
"engines": {
    "node": "12.19.0", 
    "npm": "6.14.9"
  }
```

Heroku by default, seems to use port 443 (https). 
If you try to enter the deployed app via https, you will get an error "Mixed http https ..." since the API used by the angular app is not using https.
To enable your browser to use http, for instance in chrome, go to "Settings", "Privacy and security", select the deployed angular url and set "Allow" in "Insecure Content".
