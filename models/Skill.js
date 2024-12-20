// models/Skill.js
const mongoose = require('mongoose');

// Схема для уровня навыка
const LevelSchema = new mongoose.Schema({
    completed: { type: Boolean, required: true }, // Завершён ли уровень
    description: { type: String, required: true }, // Описание уровня в формате JSON
    icon: { type: String }, // Иконка для уровня
});

// Основная схема для навыка
const SkillSchema = new mongoose.Schema(
    {
        name: { type: String, required: true }, // Название навыка
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        levels: { type: [LevelSchema], default: [] }, // Массив уровней навыка
        tags: { type: [Object], default: [] }, // Массив тегов
        order: { type: Number, required: true, default: 0 }, // Порядок навыка
    },
    { timestamps: true }
);

// Преобразование _id в id при сериализации в JSON
SkillSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
});

module.exports = mongoose.model('Skill', SkillSchema);
