# Server side with Express framework and Typescript

## Introduction

In the Server side, Express framework with Typescript has been utilized to reach a well structured and fully separated concerns source code. The source code has been separated into multiple layers.

### Nodemon

Nodemon is a utility monitors for any changes in the server-side source code, and automatically restarts the server. Nodemon is just for development purposes only.
**nodemon.json** file is used to hold the configurations for Nodemon.

### Express

Express is a web application framework for Node.js. It is used to build our backend API's.

**src/server/index.ts** is the entry point to the server application which starts a server and listens on port 3000 for connections.
