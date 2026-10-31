// Cloudflare Worker: учёт уникальных посетителей, уведомления в Telegram
// и команда /stats в боте. Сохраняется только случайный id браузера (UUID)
// и общий счётчик. IP, user-agent и другие данные не читаются и не сохраняются.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// Секрет может быть строкой или привязкой Secrets Store (нужно дождаться и вызвать get())
async function readSecret(v) {
  let value = await v;
  if (value && typeof value.get === 'function') value = await value.get();
  return value == null ? '' : String(value).trim();
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0] || '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

async function sendTelegram(env, text) {
  const token = await readSecret(env.TG_TOKEN);
  const chatId = await readSecret(env.TG_CHAT_ID);
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
  if (!res.ok) {
    let description = '';
    try {
      description = (await res.json()).description || '';
    } catch {
      description = `HTTP ${res.status}`;
    }
    throw new Error(`Telegram ${res.status}: ${description}`);
  }
}

async function getTotal(env) {
  return parseInt((await env.VISITS.get('total')) || '0', 10);
}

// Уведомление о новом уникальном посетителе
async function notifyNewVisitor(env, total) {
  const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Belgrade' });
  const text =
    '✨ <b>Новый уникальный посетитель</b>\n' +
    `🕒 ${time}\n` +
    `📈 Всего уникальных: <b>${total}</b>`;
  await sendTelegram(env, text);
}

// Ответы на команды бота. Отвечаем только в чат владельца (TG_CHAT_ID).
async function handleUpdate(env, update) {
  const msg = update.message;
  if (!msg || typeof msg.text !== 'string') return;

  const owner = await readSecret(env.TG_CHAT_ID);
  if (String(msg.chat && msg.chat.id) !== owner) return;

  // "/stats", "/stats@имя_бота" и т.п.
  const command = msg.text.trim().split(/\s+/)[0].split('@')[0].toLowerCase();
  if (command === '/stats') {
    const total = await getTotal(env);
    await sendTelegram(env, `📊 Всего уникальных посетителей: <b>${total}</b>`);
  }
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

    const url = new URL(request.url);

    // Общий счётчик: GET /stats?token=... (токен в секрете STATS_TOKEN)
    if (request.method === 'GET' && url.pathname === '/stats') {
      const statsToken = await readSecret(env.STATS_TOKEN);
      if (!statsToken || url.searchParams.get('token') !== statsToken) {
        return new Response('Forbidden', { status: 403, headers: cors });
      }
      return Response.json({ total: await getTotal(env) }, { headers: cors });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: cors });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Bad JSON', { status: 400, headers: cors });
    }

    // Обновления от Telegram (webhook): обрабатываем команды бота
    if (body && typeof body.update_id === 'number') {
      try {
        await handleUpdate(env, body);
      } catch (err) {
        console.error(err.message);
      }
      // Telegram ждёт 200, иначе будет повторно присылать то же обновление
      return new Response('ok', { headers: cors });
    }

    // Посетитель с сайта
    const id = typeof body.id === 'string' ? body.id : '';
    if (!UUID.test(id)) {
      return new Response('Bad id', { status: 400, headers: cors });
    }

    // Уже учтённый браузер — ничего не делаем
    const key = `seen:${id}`;
    if (await env.VISITS.get(key)) {
      return Response.json({ new: false }, { headers: cors });
    }

    // Сначала уведомление. Посетитель записывается только после успешной отправки.
    const total = (await getTotal(env)) + 1;
    try {
      await notifyNewVisitor(env, total);
    } catch (err) {
      console.error(err.message);
      return new Response(err.message, { status: 502, headers: cors });
    }
    await env.VISITS.put(key, '1');
    await env.VISITS.put('total', String(total));

    return Response.json({ new: true, total }, { headers: cors });
  },
};
