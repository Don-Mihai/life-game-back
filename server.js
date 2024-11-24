// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Инициализация приложения
const app = express();
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

// Подключение маршрутов
const skillRoutes = require('./routes/skillRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/skills', skillRoutes);
app.use('/users', userRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
