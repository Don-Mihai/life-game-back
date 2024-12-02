// controllers/skillController.js
const Skill = require('../models/Skill');
const User = require('../models/User');
const mongoose = require('mongoose');

// Получение навыков пользователя
exports.fetchSkills = async (req, res) => {
    const { userId: UserIdStr } = req.query;

    // Преобразуем строку в ObjectId
    const userId = new mongoose.Types.ObjectId(req.body.userId || UserIdStr);

    try {
        const skills = await Skill.find({ userId }).sort('order');
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Добавление нового навыка
exports.addSkill = async (req, res) => {
    try {
        const { name, levels, tags } = req.body;
        const userId = req.body.userId || req.params.userId; // Получаем userId из тела запроса или параметров

        const newSkill = new Skill({
            name,
            userId,
            levels,
            tags,
        });

        const savedSkill = await newSkill.save();
        res.json(savedSkill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSkill = async (req, res) => {
    try {
        const { name, levels, tags, userId: userIdBody } = req.body; // userId нужно передавать в запросе
        const skillId = new mongoose.Types.ObjectId(req.params.id);
        const userId = new mongoose.Types.ObjectId(userIdBody); // userId нужно передавать в запросе

        // Находим навык по ID
        const updatedSkill = await Skill.findByIdAndUpdate(skillId, { name, levels, tags }, { new: true });

        if (!updatedSkill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        // Получаем пользователя
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Добавление уникальных тегов в пользователя
        const existingTagTitles = user.tags.map(tag => tag.title);

        // Фильтруем уникальные теги, которых нет в user.tags
        const newTags = tags.filter(tag => !existingTagTitles.includes(tag.title));

        if (newTags.length > 0) {
            // Добавляем уникальные теги в массив tags пользователя
            user.tags.push(...newTags);

            // Сохраняем обновления в модели пользователя
            await user.save();
        }

        // Отправляем ответ с обновленным навыком
        res.json(updatedSkill);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateSkillsOrder = async (req, res) => {
    const { userId: userIdBody, skills } = req.body; // Получаем новый порядок навыков

    const userId = new mongoose.Types.ObjectId(userIdBody); 

    if (!skills || !Array.isArray(skills)) {
        return res.status(400).json({ error: 'skills should be an array' });
    }

    try {
        // Обновляем порядок навыков для пользователя
        for (let i = 0; i < skills.length; i++) {
            const skill = skills[i];
            const skillId = new mongoose.Types.ObjectId(skill.id);
            // Убедимся, что поле 'order' существует в схеме
            await Skill.findByIdAndUpdate(skillId, {
                $set: { order: i }, // Обновляем поле 'order' для каждого навыка
            });
        }

        // Возвращаем обновленные навыки, отсортированные по полю 'order'
        const updatedSkills = await Skill.find({ userId }).sort('order');
        res.json(updatedSkills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


// Удаление навыка
exports.deleteSkill = async (req, res) => {
    const skillId = new mongoose.Types.ObjectId(req.body.id || req.params.id);
    try {
        await Skill.findByIdAndDelete(skillId);
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Обновление уровня навыка
exports.updateSkillLevel = async (req, res) => {
    const { levelIndex, description } = req.body;
    const skillId = new mongoose.Types.ObjectId(req.body.id || req.params.id);
    try {
        const skill = await Skill.findById(skillId);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        if (levelIndex < 0 || levelIndex >= skill.levels.length) {
            return res.status(400).json({ message: 'Invalid level index' });
        }

        console.log('skill', skill)

        skill.levels[levelIndex] = {
            ...skill.levels[levelIndex]._doc,
            description,
        };

        console.log('updatedSkill', skill)

        const updatedSkill = await skill.save();
        res.json(updatedSkill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
