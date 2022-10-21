'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact_form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contact_form.init({
    nom_contact: DataTypes.STRING,
    prenom_contact: DataTypes.STRING,
    email_contact: DataTypes.STRING,
    societe_contact: DataTypes.STRING,
    message_contact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contact_form',
  });
  return contact_form;
};