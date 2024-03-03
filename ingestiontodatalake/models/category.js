'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    Country: DataTypes.STRING,
    ISO3: DataTypes.STRING,
    UNICEF_Region: DataTypes.STRING,
    Sex: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};