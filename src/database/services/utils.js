const throwNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'NotFoundError';
  throw err;
};

const throwNotFoundUser = (message) => {
  const err = new Error(message);
  err.name = 'NotFoundUser';
  throw err;
};

const throwPostNotExists = (message) => {
  const err = new Error(message);
  err.name = 'PostNotExists';
  throw err;
};

const throwMissingFieldsError = (message) => {
  const err = new Error(message);
  err.name = 'MissingFieldsError';
  throw err;
};

const throwCategoryNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'CategoryNotFoundError';
  throw err;
};

const throwFoundEmailInDB = (message) => {
  const err = new Error(message);
  err.name = 'FoundEmailInDB';
  throw err;
};

const throwUnauthorizedError = (message = 'Não autorizado') => {
  const err = new Error(message);
  err.name = 'UnauthorizedError';
  throw err;
};

const throwTokenError = (message = 'Não autorizado') => {
  const err = new Error(message);
  err.name = 'throwTokenError';
  throw err;
};

module.exports = {
  throwNotFoundError,
  throwUnauthorizedError,
  throwMissingFieldsError,
  throwFoundEmailInDB,
  throwTokenError,
  throwNotFoundUser,
  throwCategoryNotFoundError,
  throwPostNotExists,
};
