module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('manageable_data', [{
      nom_manageable_data: 'Nbre utilisateurs mondiaux',
      valeur_manageable_data: 100000,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('manageable_data', null, {});
  }
};