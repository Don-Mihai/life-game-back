// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/auth', userController.auth);
router.get('/:id', userController.getById);
router.put('/:id', userController.editUser);

module.exports = router;
