'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personnage_attaque', {
      personnage_attaque_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personnage_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'personnage',
          key: 'personnage_id'
        },
        allowNull: false
      },
      attaque_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'attaque',
          key: 'attaque_id'
        },
        allowNull: false
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
    await queryInterface.dropTable('personnage_attaque');
  }
};