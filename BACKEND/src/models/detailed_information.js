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
            DetailedInformation.belongsTo(models.User, { foreignKey: 'doctor_id' })
        }
    };
    DetailedInformation.init({
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        doctor_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'DetailedInformation',
        tableName: 'detailed_information',
    });
    return DetailedInformation;
};