const error = require('../handlers/errorHandler.js');

const asyncMiddleware = (req, res, next) => {
  if (typeof (req.query.apiKey) !== "string") {
    return error(res, "403", "Wrong key!");
  } else if (req.query.apiKey !== process.env.API_KEY) {
    return error(res, "403", "Wrong key!!");
  } else {
    // Promise.resolve(fn(req, res, next)).catch(next);
    return next();
  }
};

module.exports = asyncMiddleware;