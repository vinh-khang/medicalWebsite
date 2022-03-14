'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('schedules', {
            schedule_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            current_number: {
                type: Sequelize.INTEGER
            },
            max_number: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE
            },
            time_type: {
                type: Sequelize.STRING
            },
            doctor_id: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('schedules');
    }
};