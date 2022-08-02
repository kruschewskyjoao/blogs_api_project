const Joi = require('joi');
const models = require('../models');

const categoriesService = {
  async validateBody(unknown) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const result = await schema.validateAsync(unknown);
    return result;
  },
  async add(param) {
    const newCategorie = await models.Category.create(param);
    console.log(newCategorie);
    return newCategorie;
  },
  async listAll() {
    const list = await models.Category.findAll();
    return list;
  },
};

module.exports = categoriesService;
