// helpers/errorHandler.js

module.exports = errorHandler = (res, err) => {
  console.log(err);
  return res.status(422).json(err);
};
