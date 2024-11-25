// controllers/skillController.js
const Skill = require('../models/Skill');

// Получение навыков пользователя
exports.fetchSkills = async (req, res) => {
    const { userId } = req.params;
    try {
        const skills = await Skill.find({ userId });
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Добавление нового навыка
exports.addSkill = async (req, res) => {
    try {
        const { name, levels } = req.body;
        const userId = req.body.userId || req.params.userId; // Получаем userId из тела запроса или параметров

        const newSkill = new Skill({
            name,
            userId,
            levels,
        });

        const savedSkill = await newSkill.save();
        res.json(savedSkill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Обновление навыка
exports.updateSkill = async (req, res) => {
    try {
        const { name, levels } = req.body;

        const updatedSkill = await Skill.findByIdAndUpdate(
            req.params.id,
            { name, levels },
            { new: true }
        );

        res.json(updatedSkill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Удаление навыка
exports.deleteSkill = async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Обновление уровня навыка
exports.updateSkillLevel = async (req, res) => {
    const { levelIndex, updatedLevelData } = req.body;
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        if (levelIndex < 0 || levelIndex >= skill.levels.length) {
            return res.status(400).json({ message: 'Invalid level index' });
        }

        skill.levels[levelIndex] = {
            ...skill.levels[levelIndex]._doc,
            ...updatedLevelData,
        };

        const updatedSkill = await skill.save();
        res.json(updatedSkill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
