const Joi = require('joi');
const models = require('../models');

const { throwFoundEmailInDB, throwNotFoundUser } = require('./utils');

const userService = {
  async validateBody(unknown) {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().min(6),
      image: Joi.string().required(),
    });
    const result = await schema.validateAsync(unknown);
    return result;
  },
  async add(data) {
    const newUser = await models.User.create(data);
    // const { email } = newUser;
    return newUser; 
  },
  async list() {
      const all = await models.User.findAll({
        attributes: { exclude: ['password'] },
      });

    return all;
  },
/*   async listOne(email) {
    const user = await models.User.findAll({
      where: email,
      raw: true,
    });
    return user;
  }, */
  async listOne(id) {
    const user = await models.User.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
    });
    if (user === null) {
      return throwNotFoundUser('User does not exist');
    }
    return user;
  },
  async verifyEmailExists(email) {
    const verify = await models.User.findOne({ 
      where: { email },
      raw: true,
    });
    if (verify === null) {
      return email;
    }
    throw throwFoundEmailInDB('User already registered');
  },
};

module.exports = userService;
