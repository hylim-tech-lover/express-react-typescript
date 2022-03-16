import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import path from "path";
import TransactionValidator from "../validator";
import Middleware from "../middleware";
import { getJSONFromFile } from "../util";

let isFirstQuery = true;

const HTML_FILE = "/dist/index.html";

export const register = (
  app: express.Application,
  postedData: Array<{ unknown: any }>,
  completeData: Array<{ unknown: any }>
) => {
  // define a route handler for the default home page
  app.get("/", (req: express.Request, res: express.Response) => {
    res.redirect("/transactionInReact");
  });

  // define a route handler for the getting all transactions from JSON file
  app.get("/transactions", (req: express.Request, res: express.Response) => {
    const jsonData = getJSONFromFile();
    res.json(jsonData);
  });

  // define a route handler for storing transactions into server with validation
  app.post(
    "/transactions",
    TransactionValidator.checkTransactionField(),
    Middleware.handleValidationError,
    (req: express.Request, res: express.Response) => {
      const errorMessageJSON = {
        status: "fail",
        msg: "fail to create transaction via POST",
        method: "POST",
        route: "/transactions",
      };

      try {
        dayjs.extend(customParseFormat);
        const dateCreated = dayjs().format("YYYY-MM-DDTHH:mm:ss.000ZZ");
        const dateUpdated = dateCreated;
        const id = uuidv4();

        let requestBodyJSON = req.body;
        const generatedJSON = {
          id: id,
          created: dateCreated,
          updated: dateUpdated,
        };

        requestBodyJSON = { ...generatedJSON, ...requestBodyJSON };
        postedData.push(requestBodyJSON);

        requestBodyJSON = { msg: "Success", ...requestBodyJSON };
        res.json(requestBodyJSON);
      } catch (e) {
        res.json(errorMessageJSON);
      }
    }
  );

  // define a route handler for returning transactions
  app.get(
    "/transactiontable",
    (req: express.Request, res: express.Response) => {
      if (isFirstQuery) {
        const jsonData = getJSONFromFile();
        const rawData = jsonData.transactions;

        if (jsonData.status == "fail") {
          if (postedData.length > 0) {
            completeData = postedData;
          }
        } else {
          completeData = rawData;
        }

        isFirstQuery = false;
      }

      while (postedData.length > 0) {
        completeData.push(postedData.shift()!);
      }

      res.json(completeData);
    }
  );

  // define a route handler for returning transactions in React View layer (sortable table)
  app.get(
    "/transactionInReact",
    (req: express.Request, res: express.Response) => {
      res.sendFile(HTML_FILE);
    }
  );
};
