'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('earnings_simulator', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CA: {
        type: Sequelize.REAL
      },
      marge: {
        type: Sequelize.REAL
      },
      CA_avec_WellEat: {
        type: Sequelize.REAL
      },
      marge_avec_WellEat: {
        type: Sequelize.REAL
      },
      benefice_avec_WellEat: {
        type: Sequelize.REAL
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('earnings_simulator');
  }
};