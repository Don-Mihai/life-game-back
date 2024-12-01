// Получение навыков пользователя
const axios = require("axios");
exports.validateLink = async (req, res) => {
    const { url } = req.body;

    try {
        // Пытаемся запросить URL
        const response = await axios.get(url, { timeout: 5000 });

        if (response.status === 200) {
            // Если ссылка доступна, возвращаем валидность
            return res.json({
                success: 1, // Успешная валидация
                link: url
            });
        } else {
            return res.status(400).json({ success: 0, message: 'Недоступная ссылка' });
        }
    } catch (error) {
        return res.status(400).json({ success: 0, message: 'Ошибка при запросе URL' });
    }
};