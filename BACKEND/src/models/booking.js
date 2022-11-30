'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Booking.belongsTo(models.Allcode, { foreignKey: 'status_id', targetKey: 'keyMap', as: "statusData" })
            Booking.belongsTo(models.Allcode, { foreignKey: 'time_type', targetKey: 'keyMap', as: "timetypeData" })
            Booking.belongsTo(models.User, { foreignKey: 'patient_id', targetKey: 'id', as: "patientData" })
            Booking.belongsTo(models.User, { foreignKey: 'doctor_id', targetKey: 'id', as: "doctorData" })
        }
    };
    Booking.init({
        status_id: DataTypes.STRING,
        doctor_id: DataTypes.INTEGER,
        patient_id: DataTypes.INTEGER,
        date: DataTypes.DATE,
        time_type: DataTypes.STRING,
        booking_price: DataTypes.INTEGER,
        room: DataTypes.INTEGER,
        payment: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};