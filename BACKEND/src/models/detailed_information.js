'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DetailedInformation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    DetailedInformation.init({
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        doctor_id: DataTypes.INTEGER,
        specialty_id: DataTypes.INTEGER,
        clinic_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'DetailedInformation',
    });
    return DetailedInformation;
};