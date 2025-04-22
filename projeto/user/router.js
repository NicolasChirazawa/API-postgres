const express = require('express');
const router = express.Router();
const userController = require('./controller.js');

router.post('/register',    userController.registerUser);
router.post('/login',       userController.logInUser);
router.post('/logout',      userController.logOutUser);
router.post('/users',       userController.verityToken, userController.createUser);
router.get('/users',        userController.verityToken, userController.getAllUsers);
router.get('/users/:id',    userController.verityToken, userController.getUser);
router.put('/users/:id',    userController.verityToken, userController.updateUser);
router.delete('/users/:id', userController.verityToken, userController.deleteUser);
router.patch('/users/:id',  userController.verityToken, userController.patchUser);

module.exports = router;