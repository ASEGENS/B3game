const express = require('express');
const app = express();
const config = require('./config/config.json');  // ajustez le chemin vers votre fichier de configuration
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');



app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3001/', // Remplacez par l'URL de votre application React
  credentials: true, // Activez l'envoi des cookies
};
app.use(cors(corsOptions));


app.use(express.json());

app.use(bodyParser.json());

// Ici, nous préfixons toutes les routes définies dans userRoutes avec '/user'
app.use('/user', userRoutes);




//Vérifier si la connexion à la base de donnée se fait correctement
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    logging: console.log,
  }
);

sequelize.authenticate()
  .then(() => console.log('La connexion à la base de données a été établie avec succès.'))
  .catch(err => console.error('Impossible de se connecter à la base de données:', err));


app.listen(3000);