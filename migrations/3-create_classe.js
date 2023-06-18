'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classe', {
      classe_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classe_nom: {
        type: Sequelize.STRING
      },
      famille: {
        type: Sequelize.STRING
      },
      gold: {
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.INTEGER
      },
      force: {
        type: Sequelize.INTEGER
      },
      perception: {
        type: Sequelize.INTEGER
      },
      constitution: {
        type: Sequelize.INTEGER
      },
      defense: {
        type: Sequelize.INTEGER
      },
      vitesse: {
        type: Sequelize.INTEGER
      },
      intelligence: {
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
    await queryInterface.dropTable('classe');
  }
};
