const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Обслуживание статических файлов из папки web
app.use(express.static(path.join(__dirname, '../../web')));

// API endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log('Статические файлы обслуживаются из папки web/');
    console.log('Доступные страницы:');
    console.log('  http://localhost:8080 - Главная');
    console.log('  http://localhost:8080/races.html - Расы');
    console.log('  http://localhost:8080/classes.html - Классы');
    console.log('  http://localhost:8080/religions.html - Религии');
    console.log('  http://localhost:8080/applications.html - Анкеты');
    console.log('  http://localhost:8080/mechanics.html - Механики');
    console.log('  http://localhost:8080/abilities.html - Способности');
});