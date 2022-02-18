'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {as: "user", foreignKey: "product_id", targetKey: "id"})

    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull:false
    },

    createdAt: {
      allowNull: false,
      type:DataTypes.DATE,
      defaultValue: new Date()
    },

    updatedAt: {
      allowNull: false,
      type:DataTypes.DATE,
      defaultValue: new Date()
    }

  }, {
    sequelize,
    tableName: "products",
    modelName: 'Product',
    timestamps: true
  });
  return Product;
};