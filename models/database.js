const Sequelize = require('sequelize');
const config = require('../config/config.json');
const { development } = require ('../config/config.json');

// Créer une instance Sequelize
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect
  }
);


  // Définir un modèle pour la table "utilisateur"
const utilisateur = sequelize.define('utilisateur', {
    utilisateur_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING,
    date_de_nais :Sequelize.DATE,
    mail: Sequelize.STRING,
    mdp: Sequelize.STRING
});
  
  // Définir un modèle pour la table "personnage"
const personnage = sequelize.define('personnage', {
    personnage_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    personnage_nom: Sequelize.STRING,
    famille: Sequelize.STRING,
    gold: Sequelize.INTEGER,
    level: Sequelize.INTEGER,
    force: Sequelize.INTEGER,
    perception: Sequelize.INTEGER,
    constitution: Sequelize.INTEGER,
    defense: Sequelize.INTEGER,
    vitesse: Sequelize.INTEGER,
    intelligence: Sequelize.INTEGER,
});


  // Définir un modèle pour la table "pnj"
const pnj = sequelize.define('pnj', {
    pnj_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pnj_nom: Sequelize.STRING
});



  // Définir un modèle pour la table "attaque"
const attaque = sequelize.define('attaque', {
    attaque_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    attaque_nom: Sequelize.STRING
});


  // Définir un modèle pour la table "classe"
const classe = sequelize.define('classe',{
    classe_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    classe_nom: Sequelize.STRING,
    famille: Sequelize.STRING,
    gold: Sequelize.INTEGER,
    level: Sequelize.INTEGER,
    force: Sequelize.INTEGER,
    perception: Sequelize.INTEGER,
    constitution: Sequelize.INTEGER,
    defense: Sequelize.INTEGER,
    vitesse: Sequelize.INTEGER,
    intelligence: Sequelize.INTEGER,
});

  // Définir un modèle pour la table "item"
const item = sequelize.define('item',{
    item_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item_nom: Sequelize.STRING,
    item_description: Sequelize.STRING, 
    item_prix: Sequelize.FLOAT,
});


// Définir un modèle pour la table de joINTEGERure "personnage_attaque"
const personnage_attaque = sequelize.define('personnage_attaque', {
    personnage_attaque_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
});

// Définir les associations many-to-many
attaque.belongsToMany(personnage, { 
    through: personnage_attaque,
    foreignKey: 'attaque_id', 
    otherKey: 'personnage_id'
});

personnage.belongsToMany(attaque, { 
    through: personnage_attaque,
    foreignKey: 'personnage_id', 
    otherKey: 'attaque_id' 
});


// Définir un modèle pour la table de joINTEGERure "pnj_attaque"
const pnj_attaque = sequelize.define('pnj_attaque', {
    pnj_attaque_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
});

// Définir les associations many-to-many
attaque.belongsToMany(pnj, { 
    through: pnj_attaque,
    foreignKey: 'attaque_id', 
    otherKey: 'pnj_id'
});

pnj.belongsToMany(attaque, { 
    through: pnj_attaque,
    foreignKey: 'pnj_id', 
    otherKey: 'attaque_id'
});



// Associer la table "pnj" à la table "classe" avec une relation "belongsTo"
pnj.belongsTo(classe, { foreignKey: 'classe_id' });
  
  // Associer la table "personnage" à la table "utilisateur" avec une relation "belongsTo"
personnage.belongsTo(utilisateur, { foreignKey: 'utilisateur_id' });

  // Associer la table "personnage" à la table "classe" avec une relation "belongsTo"
personnage.belongsTo(classe, { foreignKey: 'classe_id' });

  // Associer la table "personnage" à la table "item" avec une relation "belongsTo"
personnage.belongsTo(item, { foreignKey: 'item_id' }); 

 
  
  // Synchroniser les modèles avec la base de données
sequelize.sync({force: false})
    .then(() => {
      console.log('La base de données est prête');
    })
    .catch((err) => {
      console.error('Erreur lors de la synchronisation de la base de données :', err);
});
  
  // Exporter les modèles
module.exports = {
    utilisateur,
    personnage,
    classe,
    pnj,
    item,
    pnj_attaque,
    personnage_attaque,
    attaque
  };