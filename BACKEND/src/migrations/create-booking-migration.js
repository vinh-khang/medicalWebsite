'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bookings', {
            booking_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            status_id: {
                type: Sequelize.STRING
            },
            doctor_id: {
                type: Sequelize.INTEGER
            },
            patient_id: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE
            },
            time_type: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('bookings');
    }
};