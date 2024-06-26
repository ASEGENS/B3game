'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pnj_attaque', {
      pnj_attaque_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pnj_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pnj',
          key: 'pnj_id'
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
    await queryInterface.dropTable('pnj_attaque');
  }
};