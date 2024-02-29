// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/utilisateurs', userController.getAllUsers);
router.post('/register', userController.register);
router.put('/users/:id', userController.updateUser);
router.get('/userCount', userController.userCount)



module.exports = router;
