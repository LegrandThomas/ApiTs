'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contact_form', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom_contact: {
        type: Sequelize.STRING
      },
      prenom_contact: {
        type: Sequelize.STRING
      },
      email_contact: {
        type: Sequelize.STRING
      },
      societe_contact: {
        type: Sequelize.STRING
      },
      message_contact: {
        type: Sequelize.STRING
      },
      demande_rappel: {
        type: Sequelize.BOOLEAN
      },
      inscrit_newsletter: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('contact_forms');
  }
};