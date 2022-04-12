'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Specialty.hasMany(models.DoctorDetail, { foreignKey: 'specialty_id' })
        }
    };
    Specialty.init({
        specialty_name: DataTypes.STRING,
        specialty_Markdown: DataTypes.TEXT('long'),
        specialty_HTML: DataTypes.TEXT('long'),
        specialty_image: DataTypes.STRING,
        specialty_price: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
};