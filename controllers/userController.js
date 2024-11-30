// controllers/userController.js
const User = require('../models/User');
const mongoose = require("mongoose");

// Регистрация пользователя
exports.register = async (req, res) => {
    try {
        const { firstName, email, password, characteristics } = req.body;

        // Проверяем, не существует ли уже пользователь с таким email
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        // Создаем нового пользователя
        const newUser = new User({
            firstName,
            email,
            password, // Рекомендуется хешировать пароль
            characteristics,
        });

        const savedUser = await newUser.save();

        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Аутентификация пользователя
exports.auth = async (req, res) => {
    const { email, password } = req.body; // Используйте body, а не query
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        // Сравнение паролей (для простоты без хеширования)
        if (user.password !== password) return res.status(401).json({ message: 'Invalid credentials' });


        const userJSON = user.toJSON();

        // Удаляем пароль из ответа
        delete userJSON.password;

        res.json(userJSON);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Получение пользователя по ID
exports.getById = async (req, res) => {
    const userId = mongoose.Types.ObjectId(req.params.id);
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Редактирование пользователя
exports.editUser = async (req, res) => {
    const userId = mongoose.Types.ObjectId(req.params.id);
    try {
        const { firstName, email, characteristics } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, email, characteristics },
            { new: true }
        ).select('-password');

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
