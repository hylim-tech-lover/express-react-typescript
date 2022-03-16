import { body } from "express-validator";

class TransactionValidator {
  checkTransactionField() {
    return [
      body("id")
        .isEmpty()
        .withMessage(
          "This field should be empty as will be autogenerated as UUID"
        ),

      body("amount")
        .notEmpty()
        .withMessage("Amount should not be empty")
        .isInt({ min: 0 })
        .withMessage("Should be more than or equal to 0")
        .isCurrency()
        .withMessage("Amount should be in currency format"),

      body("currency")
        .trim()
        .notEmpty()
        .withMessage("Type of currency should not be empty")
        .isString()
        .withMessage("This field should be string"),

      body("currentState")
        .trim()
        .notEmpty()
        .withMessage("currentState should not be empty")
        .isIn(["CONFIRMED", "PROCESSED", "CREATED"])
        .withMessage("The value should be CONFIRMED, PROCESSED, CREATED only"),

      body("created")
        .isEmpty()
        .withMessage("This field should be empty as will be autogenerated"),

      body("updated")
        .isEmpty()
        .withMessage("This field should be empty as will be autogenerated"),
    ];
  }
}

export default new TransactionValidator();