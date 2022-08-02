'use strict';

const postCategories = (sequelize, DataTypes) => {
  const postCategories = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  }, { timestamps: false });

  postCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: postCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'posts',
    });
    models.BlogPost.belongsToMany(models.Category, {
      through: postCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories'
    });
  }
  return postCategories
}

module.exports = postCategories;
