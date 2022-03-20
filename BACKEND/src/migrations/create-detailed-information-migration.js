'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('detailed_information', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentHTML: {
                type: Sequelize.TEXT('long'),
                allowNull: false
            },
            contentMarkdown: {
                type: Sequelize.TEXT('long'),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT('long'),
                allowNull: true
            },
            doctor_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            specialty_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            clinic_id: {
                type: Sequelize.INTEGER,
                allowNull: true
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
        await queryInterface.dropTable('detailed_information');
    }
};