const Joi = require('joi');
const models = require('../models');
const { throwMissingFieldsError,
  throwCategoryNotFoundError,
  throwPostNotExists } = require('./utils');

const categories = async (category) => {
  const result = await Promise.all(category.map(async (id) => {
    const exist = await models.Category.findOne({ where: { id } });
    return exist;
  }));
  for (let i = 0; i < result.length; i += 1) {
    if (!result[i]) {
      throw throwCategoryNotFoundError('"categoryIds" not found');
    }
  }
  return {};
};

const postService = {
  async validateBody(unknown) {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().required(),
    });
    try {
      const result = await schema.validateAsync(unknown);
      return result;
    } catch (error) {
      throw throwMissingFieldsError('Some required fields are missing');
    }
  },
  async add(data, id) {
    const { title, content, categoryIds } = data;
    const validateCategory = await categories(categoryIds);
    if (validateCategory.message) return validateCategory;
    const post = await models.BlogPost.create({
      title, content, userId: id, published: new Date(), updated: new Date() });
      await Promise.all(categoryIds.map((ctgId) => models.PostCategory
      .create({ postId: post.id, categoryId: ctgId })));
    return {
      id: post.id,
      title,
      content,
      userId: id,
      updated: post.updated,
      published: post.published,
    };
  },
  async get() {
    const getAll = await models.BlogPost.findAll({
      include: 
      [{ model: models.User, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Category, as: 'categories', through: { attributes: [] } }, 
      ] });
    return getAll;
  },
  async getById(param) {
    const { id } = param;
    const get = await models.BlogPost.findByPk(id, {
      include: 
      [{ model: models.User, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Category, as: 'categories', through: { attributes: [] } },
    ] });
    if (get === null) return throwPostNotExists('Post does not exist');
    return get;
  },
};

module.exports = postService;
