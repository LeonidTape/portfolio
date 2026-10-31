# Счётчик уникальных посетителей (Cloudflare Workers, бесплатно)

1. Telegram: в @BotFather создайте бота, получите токен. Напишите боту любое сообщение,
   затем откройте `https://api.telegram.org/bot<ТОКЕН>/getUpdates` и найдите `chat.id` — это TG_CHAT_ID.
2. Установите Node.js, затем в папке `worker`:
   ```
   npx wrangler login
   npx wrangler kv namespace create VISITS
   ```
   Полученный id вставьте в `wrangler.toml` (поле `id`).
3. В `wrangler.toml` укажите в ALLOWED_ORIGINS адрес вашего сайта.
4. Секреты (вводятся в терминале, в файлы не записываются):
   ```
   npx wrangler secret put TG_TOKEN
   npx wrangler secret put TG_CHAT_ID
   npx wrangler secret put STATS_TOKEN
   ```
   STATS_TOKEN — любая длинная случайная строка, по ней открывается счётчик.
5. Деплой: `npx wrangler deploy`. Команда выведет адрес вида `https://site-visits.<вы>.workers.dev`.
6. Вставьте этот адрес в `assets/js/analytics.js` в константу `ENDPOINT`.

Счётчик: `https://site-visits.<вы>.workers.dev/stats?token=STATS_TOKEN`.
