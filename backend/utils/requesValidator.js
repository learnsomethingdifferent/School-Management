const { ErrorHandler } = require("../middlewares/errorHandler.js");

class ValidatorMiddleware {
  validateBody(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      next();
    };
  }

  validateParams(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.params);
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }
      next();
    };
  }
}

module.exports = new ValidatorMiddleware();
