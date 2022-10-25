'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prenom_users_reviews: {
        type: Sequelize.STRING
      },
      magasin_enseigne_users_reviews: {
        type: Sequelize.STRING
      },
      poste_users_reviews: {
        type: Sequelize.STRING
      },
      commentaire_users_reviews: {
        type: Sequelize.STRING
      },
      photo_users_reviews: {
        type: Sequelize.STRING
      },
      pin_users_reviews: {
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
    await queryInterface.dropTable('users_reviews');
  }
};