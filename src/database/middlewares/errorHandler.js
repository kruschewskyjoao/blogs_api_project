const errors = {
  ValidationError: 400,
  NotFoundError: 400,
  UnauthorizedError: 400,
  MissingFieldsError: 400,
  FoundEmailInDB: 409,
  throwTokenError: 401,
  NotFoundUser: 404,
  CategoryNotFoundError: 400,
  PostNotExists: 404,
};

const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  console.log(err);
  const status = errors[name];
  // if (!status) return res.status(500).json({ err });
  res.status(status).json({ message });
};

module.exports = errorHandler;