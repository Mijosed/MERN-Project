const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes d'authentification
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);
router.get('/logout', authController.logout);

// Utilisez le middleware Passport pour authentifier les requêtes avec JWT
router.get('/userinfo', passport.authenticate('jwt', { session: false }), authController.getUserInfo);

module.exports = router;
