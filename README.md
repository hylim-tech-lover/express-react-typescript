# Express-React-Typescript

This project is heavily inspired by [this boilerplate template](https://github.com/fractalliter/express-react-typescript) and have been trimmed down to be a lightwight web application using ***Express framework for web services*** and ***ReactJS library for front-end development*** with help of ***Typescript***. It is configured to separate client-side JavaScript (React) and server-side Javascript (Express).

## Pre-requisite

[Node JS](https://nodejs.org/en/download/) have to be installed in order to use this on local environment and node version used for this project is ```16.3.1``` . 

The server will be running on port ```3000``` and hence make sure no other application is using the port before launching the server. 

## Quick Start

```bash
# Clone the repository
git clone https://github.com/hylim-tech-lover/express-react-typescript <app-name>

#Attention please: change the <app-name> with your prefered name for your app

# Go inside the directory
cd <app-name>

# Make sure node JS is installed and check version
node -v  

# Install dependencies
npm install 

# Build and start for production server
npm run start
```

If the build is successfully, an endpoint to ```localhost:3000``` will be launched at your default browser and a React components of sortable table will be rendered at the particular endpoint. 

The table entries are injected from [data.json](src/server/data.json) which emulates financial transactions and be mindful that each column can be sorted ascendingly or descendingly by hovering over the column header. 

![React Sortable Table](https://i.gyazo.com/496d6b6dfa8dc91e095b760a41dedc57.png)
 
## Available APIs

> ```GET```  http://localhost:3000/transactions

This API will return the raw JSON format from [data.json](src/server/data.json) to the client and should be used as a consumed API as shown below.
```JSON
{
  "status": "success",
  "transactions":
    [
      {
        "id": "1",
        "created": "2022-03-14T09:01:07+08:00",
        "updated": "2022-03-14T17:01:07+08:00",
        "currentState": "CONFIRMED",
        "amount": 1200,
        "currency": "GBP"
      },
      {
        "id": "2",
        "created": "2022-03-15T10:01:08+08:00",
        "updated": "2022-03-15T12:01:58+08:00",
        "currentState": "PROCESSED",
        "amount": 1800,
        "currency": "SGD"
      },
      {
        "id": "3",
        "created": "2022-03-15T16:01:07+02:00",
        "updated": "2022-03-15T16:01:07+02:00",
        "currentState": "CREATED",
        "amount": 0.02,
        "currency": "ETH"
      }
     ]
}

```
***

> ```POST``` http://localhost:3000/transactions

This API however required external tools as we need to feed in the API with a request body in JSON format. 

Get [Postman](https://www.postman.com/downloads/) on desktop based on the OS and create a new request. Set method to ```POST``` with the above API.

Then, choose ```Body``` , then ```raw``` and make sure JSON is selected. Paste in the following skeleton and fill in accordingly.
```JSON
{
  "currentState": "INSERT_OPTION_HERE",  
  "amount": INSERT AMOUNT,
  "currency": "INSERT_CURRENCY"
}
````

Sample
```JSON
{
  "currentState": "PROCESSED",  
  "amount": 317.50,
  "currency": "SGD"
}
````

There is a few validation check on the information filled in above for instance if user did not include ```currency``` field in the JSON request body, they will receive the invalid JSON response body once they send the request as shown below:

JSON request body
```JSON
{
  "currentState": "PROCESSED",
  "amount": 317.50
}
````

JSON response body
```JSON
{
    "errors": [
        {
            "value": "",
            "msg": "Type of currency should not be empty",
            "param": "currency",
            "location": "body"
        }
    ]
}
````
Pass criteria are summarized as below and any value that is not met will be prompted by error message such as above with root cause.
1. ```currentState``` can be only these 3 values : ```CREATED``` , ```PROCESSED``` and ```CONFIRMED```
2. ```amount``` cannot be negative, must be integer and not empty
3. ```currency``` must be not empty and be in string 

***
> ```GET``` http://localhost:3000 / http://localhost:3000/transactionInReact

This is the default endpoint once user start the server and it is deemed to be the interface that interacts with users. It is a React component that function as sortable table and the data of table will be increased by the successful ```POST``` call of the method above upon the lifetime of server. 
***

## Directory Structure [(in src)](src)
 |folder        | Description                                                                              
 |:------------:|:------------------------------------------------------------------------------------------
 | `client`   |Folder that contains all React-related code
 | `server`   |Folder that contains backend-code for Express  

For production mode, Webpack bundles everything into the dist directory which will be autogenerated.

## Framework and Depedency Glossary

### Typescript

[Typescript](https://www.typescriptlang.org) is a typed superset for Javascript that compiles to plain JavaScript. 

### ESLint

[ESLint](https://eslint.org/) is a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript and Typescript.


### Webpack

[Webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to capable Front-end developers to experience a modular programming style and bundle JavaScript and CSS files for usage in a browser.

1.  **entry:** is where the application starts executing and Webpack starts bundling.
2.  **output path and filename:** the target directory and the filename for the bundled output.
3.  **module loaders:** Module loaders are transformations that are applied on the source code of a module. 


### Nodemon

Nodemon is a utility monitors for any changes in the server-side source code, and automatically restarts the server. Nodemon is just for development purposes only.
**nodemon.json** file is used to hold the configurations for Nodemon.

### Express

Express is a web application framework for Node.js. It is used to build backend API's.

### VSCode + ESLint + Prettier

[VSCode](https://code.visualstudio.com/) is a lightweight but powerful source code editor. [ESLint](https://eslint.org/) takes care of the code-quality. [Prettier](https://prettier.io/) takes care of all the formatting.

#### Installation guide

1.  Install [VSCode](https://code.visualstudio.com/)
2.  Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3.  Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
4.  Modify the VSCode user settings to add below configuration

    ```javascript
    "eslint.alwaysShowStatus": true,
    "eslint.autoFixOnSave": true,
    "editor.formatOnSave": true,
    "prettier.eslintIntegration": true
    ```
