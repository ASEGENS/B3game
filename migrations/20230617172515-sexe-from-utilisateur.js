'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('utilisateur', 'sexe');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('utilisateur', 'sexe', Sequelize.STRING);
  }
};
