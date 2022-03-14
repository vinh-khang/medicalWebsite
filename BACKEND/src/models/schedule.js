'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Schedule.init({
        current_number: DataTypes.INTEGER,
        max_number: DataTypes.INTEGER,
        date: DataTypes.DATE,
        time_type: DataTypes.STRING,
        doctor_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};