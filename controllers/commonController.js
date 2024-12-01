// Получение навыков пользователя
const axios = require("axios");
const metascraper = require('metascraper');
const metascraperTitle = require('metascraper-title');
const metascraperDescription = require('metascraper-description');
const metascraperImage = require('metascraper-image');

// Настройка метаскрапера для извлечения мета-данных
const scraper = metascraper([
    metascraperTitle(),
    metascraperDescription(),
    metascraperImage()
]);


exports.validateLink = async (req, res) => {

    const url = req.query.url || req.params.url;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ success: 0, message: 'URL не передан или некорректен' });
    }

    try {
        // Пытаемся запросить URL и извлечь его мета-данные
        const response = await axios.get(decodeURIComponent(url), { timeout: 5000 });

        if (response.status === 200) {
            // Извлекаем мета-данные с помощью metascraper
            const metadata = await scraper({ url: decodeURIComponent(url) });

            return res.json({
                success: 1, // Успешная валидация
                meta: {
                    title: metadata.title || 'No title found', // Заголовок страницы
                    description: metadata.description || 'No description found', // Описание страницы
                    image: {
                        url: metadata.image || 'https://example.com/default-image.png' // Изображение
                    }
                }
            });
        } else {
            return res.status(400).json({ success: 0, message: 'Недоступная ссылка' });
        }
    } catch (error) {
        return res.status(400).json({ success: 0, message: 'Ошибка при запросе URL' });
    }
};