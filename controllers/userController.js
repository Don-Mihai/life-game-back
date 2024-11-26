// controllers/userController.js
const User = require('../models/User');

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
    const { email, password } = req.body; // Рекомендуется использовать body, а не query
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        // Сравнение паролей (для простоты без хеширования)
        if (user.password !== password) return res.status(401).json({ message: 'Invalid credentials' });

        // Убираем пароль из ответа
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.json(userWithoutPassword);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Получение пользователя по ID
exports.getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Редактирование пользователя
exports.editUser = async (req, res) => {
    try {
        const { firstName, email, characteristics } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { firstName, email, characteristics },
            { new: true }
        ).select('-password');

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
