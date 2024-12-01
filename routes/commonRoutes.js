// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const commonController = require('../controllers/commonController');

router.get('/validate-link', commonController.validateLink);


module.exports = router;