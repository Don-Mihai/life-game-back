// models/User.js
const mongoose = require('mongoose');

// схема для характеристик
const CharacteristicSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
});

// Основная схема пользователя
const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        tags: [{ title: { type: String, unique: true } }], // Массив тегов для пользователя
        characteristics: [CharacteristicSchema], // Массив характеристик
        order: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

// Преобразование _id в id при сериализации в JSON
UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
});

module.exports = mongoose.model('User', UserSchema);
