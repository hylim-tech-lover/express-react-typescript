import express, { Express } from "express";
import { RequestHandler } from "express-serve-static-core";
import open from "open";
import * as routes from "./routes";

//global variable to store postedJSON data. Not advisable for production use
const postedData: { unknown: any }[] = [];
const completeData: { unknown: any }[] = [];

// call express
const app: Express = express(); // define our app using express

// configure app to use bodyParser for
// Getting data from body of requests
app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(express.json() as RequestHandler);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
app.use(express.static("dist"));
const port = 3000; // set our port

// REGISTER ROUTES
routes.register(app, postedData, completeData);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`App listening at http://localhost:${port}`);
open(`http://localhost:${port}`);
