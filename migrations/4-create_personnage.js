'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personnage', {
      personnage_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personnage_nom: {
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
      type : Sequelize.INTEGER
      },

      
      vitesse: {
      type : Sequelize.INTEGER
      },


      intelligence: {
      type: Sequelize.INTEGER
      },

      utilisateur_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'utilisateur', // nom du modèle Source
          key: 'utilisateur_id', // clé dans le modèle Source que nous référençons
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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

      item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'item', // nom du modèle Source
          key: 'item_id', // clé dans le modèle Source que nous référençons
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
    await queryInterface.dropTable('personnage');
  }
};