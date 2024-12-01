// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const commonController = require('../controllers/commonController');

router.post('/validate-link', commonController.validateLink);


module.exports = router;