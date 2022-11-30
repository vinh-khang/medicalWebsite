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
            DoctorDetail.belongsTo(models.User, { foreignKey: 'doctor_id' })
            DoctorDetail.belongsTo(models.Specialty, { foreignKey: 'specialty_id' })
        }
    };
    DoctorDetail.init({
        doctor_id: DataTypes.INTEGER,
        specialty_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'DoctorDetail',
        tableName: 'doctor_detail',
    });
    return DoctorDetail;
};