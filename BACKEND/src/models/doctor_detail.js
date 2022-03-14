'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DoctorDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    DoctorDetail.init({
        doctor_id: DataTypes.INTEGER,
        clinic_id: DataTypes.INTEGER,
        specialty_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'DoctorDetail',
    });
    return DoctorDetail;
};