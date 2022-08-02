const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { throwTokenError } = require('./utils');

const secret = process.env.JWT_SECRET;

const authService = {
  async validateHeaderToken(unknow) {
    const schema = Joi.string().required();
    try {
      const result = await schema.validateAsync(unknow);
      return result;
    } catch (error) {
      throw throwTokenError('Token not found');
    }
  },
  async makeToken(user) {
    const { id, email } = user;
    const token = jwt.sign({ data: { id, email } }, secret);
    return token;
  },
  async readToken(token) {
    try {
      const { data } = jwt.verify(token, secret);
      return data;  
    } catch (error) {
      throw throwTokenError('Expired or invalid token');
    }
  },
};

module.exports = authService;
