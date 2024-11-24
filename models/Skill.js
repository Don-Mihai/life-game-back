// models/Skill.js
const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
    // Определите структуру уровня
});

const SkillSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    levels: [LevelSchema],
    // Другие поля навыка
});

module.exports = mongoose.model('Skill', SkillSchema);
