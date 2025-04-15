const express = require('express');
const router = express.Router();
const userController = require('./controller.js');

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.patch('/users/:id', userController.patchUser);

module.exports = router;