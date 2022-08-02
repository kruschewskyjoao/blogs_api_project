const Joi = require('joi');
const models = require('../models');
const { throwNotFoundError,
  throwMissingFieldsError } = require('./utils');

const loginService = {
  async validateBody(param) {
    const schema = Joi.object({
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().max(255),
    });
    try {
      const result = await schema.validateAsync(param);
      return result;
    } catch (error) {
      throwMissingFieldsError('Some required fields are missing');
    }
  },
  async list(email) {
    const user = await models.User.findOne({
      where: { email },
      raw: true,
    });
    return user;
  },

  async getByEmailOrThrows(email, password) {
    const user = await models.User.findOne({
      where: { email, password },
      attributes: { exclude: ['id', 'displayName', 'image'] },
    });
    if (!user) throwNotFoundError('Invalid fields');
    return user;
  },
};

module.exports = loginService;
