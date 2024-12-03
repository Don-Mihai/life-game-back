// routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.get('/', skillController.fetchSkills);
router.post('/', skillController.addSkill);
router.put('/update-order', skillController.updateSkillsOrder);
router.put('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);
router.put('/:id/level', skillController.updateSkillLevel);



module.exports = router;
