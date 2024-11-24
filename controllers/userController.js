// controllers/userController.js
const User = require('../models/User');

// Регистрация пользователя
exports.register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.json({ user: savedUser, userId: savedUser._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Аутентификация пользователя
exports.auth = async (req, res) => {
    const { email, password } = req.query;
    try {
        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Получение пользователя по ID
exports.getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Редактирование пользователя
exports.editUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
