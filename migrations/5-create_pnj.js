'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pnj', {
      pnj_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pnj_nom: {
        type: Sequelize.STRING
      },

      classe_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'classe', // nom du modèle Source
          key: 'classe_id', // clé dans le modèle Source que nous référençons
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('pnj');
  }
};
