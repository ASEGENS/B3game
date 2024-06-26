const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/signUp', userController.signUp);
router.post('/logIn', userController.logIn);
router.post('/characterCreationMenu', userController.logIn);

module.exports = router;