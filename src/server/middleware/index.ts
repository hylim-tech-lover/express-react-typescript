import * as express from "express";
import { validationResult } from "express-validator";

class Middleware {
  handleValidationError(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const error = validationResult(req); // Validate on request body

    // If error is not empty
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    next(); // otherwise, continue with function after this middleware function
  }
}

export default new Middleware();
