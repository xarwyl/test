const express = require('express');
const path = require('path');

const app = express();
// Берём порт от хостинга или 3000 для локального запуска
const PORT = process.env.PORT || 3000;

// Разрешаем серверу понимать JSON в POST-запросах
app.use(express.json());
// Раздаём статические файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Тестовый GET-маршрут (информация о сервере)
app.get('/api/status', (req, res) => {
  res.json({
    status: 'OK',
    nodeVersion: process.version,
    platform: process.platform,
    uptimeSeconds: Math.floor(process.uptime()),
    serverTime: new Date().toLocaleString('ru-RU')
  });
});

// Тестовый POST-маршрут (эхо-ответ)
app.post('/api/echo', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Пустое сообщение' });
  }
  res.json({
    reply: `Сервер получил: "${message}"`,
    timestamp: Date.now()
  });
});

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});