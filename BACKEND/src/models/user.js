'use strict';
const {
  Model
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
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    image: DataTypes.STRING,
    gender: DataTypes.STRING,
    role_id: DataTypes.STRING,
    position_id: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};