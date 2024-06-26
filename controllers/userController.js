const Joi = require('@hapi/joi');
const { utilisateur } = require('../models/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


// Définir le schéma de validation
const schema = Joi.object({
    nom: Joi.string()
    .uppercase()
    .required(),
    prenom: Joi.string()
    .custom((value, helpers) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(), 'Prenom formatting')
    .required(),
    date_de_nais: Joi.date()
    .iso()
    .required(),
    mail: Joi.string()
    .email()
    .required(),
    mdp: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})'))
    .message('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et avoir une longueur d\'au moins 6 caractères')
    .required()
});



// Contrôleur d'inscription
exports.signUp = async (req, res) => {
    try {
        const { error, value } = schema.validate(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        let { nom, prenom, date_de_nais, mail, mdp } = value;
        prenom = prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase();
        nom = nom.toUpperCase();

        // Hasher le mot de passe
        mdp = await bcrypt.hash(mdp, saltRounds);



        const nouveauUtilisateur = await utilisateur.create({ nom, prenom, date_de_nais, mail, mdp });
        res.status(201).json(nouveauUtilisateur);
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ error: 'Erreur lors de l\'inscription', message: error.message });
    }
};


// Contrôleur de connexion + recup token pour la création de personnage
exports.logIn = async (req, res) => {
    try {
        const { mail, mdp } = req.body;
        if (!mail || !mdp) {
            return res.status(400).json({ error: 'Les champs mail et mdp sont requis' });
        }
        const user = await utilisateur.findOne({ where: { mail } });
        if (!user) {
            return res.status(400).json({ error: 'Utilisateur non trouvé' });
        }
        const match = await bcrypt.compare(mdp, user.mdp);
        if (!match) {
            return res.status(400).json({ error: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Connexion réussie', token });
       

    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ error: 'Erreur lors de la connexion', message: error.message });
    }
};