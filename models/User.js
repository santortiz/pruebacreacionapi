'use strict';
const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
      User.hasMany(models.Product, {as: "products", foreignKey: "product_id"})
    }
  }
  User.init({
    firstName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'user',
    modelName: 'User',
    timestamps: true
  });

  return User;
};