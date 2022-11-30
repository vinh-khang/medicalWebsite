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
      User.belongsTo(models.Allcode, { foreignKey: 'position_id', targetKey: 'keyMap', as: "positionData" })
      User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: "genderData" })
      User.hasOne(models.DetailedInformation, { foreignKey: 'doctor_id' })
      User.hasOne(models.DoctorDetail, { foreignKey: 'doctor_id' })
      User.hasMany(models.Booking, { foreignKey: 'id' })
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