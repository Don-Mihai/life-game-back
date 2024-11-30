#!/bin/bash

echo "Начинаем деплой бэкенда..."

# Переходим в директорию бэкенда
cd /var/www/life-game-back

# Обновляем код
git pull origin main

# Устанавливаем зависимости
npm install

# Перезапускаем бэкенд с помощью PM2
pm2 restart life-game-back || pm2 start index.js --name life-game-back

echo "Деплой бэкенда завершен."
