// Получение навыков пользователя
const axios = require("axios");
exports.validateLink = async (req, res) => {
    const { url } = req.query; // Получаем параметр "url" из строки запроса

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ success: 0, message: 'URL не передан или некорректен' });
    }

    try {
        // Пытаемся запросить URL
        const response = await axios.get(decodeURIComponent(url), { timeout: 5000 });

        if (response.status === 200) {
            // Если ссылка доступна, возвращаем успешный результат
            return res.json({
                success: 1, // Успешная валидация
                link: decodeURIComponent(url) // Возвращаем декодированный URL
            });
        } else {
            return res.status(400).json({ success: 0, message: 'Недоступная ссылка' });
        }
    } catch (error) {
        return res.status(400).json({ success: 0, message: 'Ошибка при запросе URL' });
    }
};