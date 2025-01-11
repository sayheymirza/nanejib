const ohmyapi_api_key = "cm4l1lk2o0000vrt4xtb8x4h4";
const telegram_bot_token = "7986857540:AAGPlAjmKLwVCcrb4Hh6lS7jrYFBYXWKzd0";
const telegram_channel_id = "-1002488180276";
const telegram_message_timeout = 1000 * 60 * 60 * 3;

const telegram_keyboard = [
    {
        text: '💵 دلار',
        keywords: ['دلار', 'dollar'],
        callback_data: 'price_dollar_rl',
        function: async () => { const price = await getPriceOf('price_dollar_rl'); return price['current'] / 10; }
    },
    // یورو : price_eur
    {
        text: '💵 یورو',
        keywords: ['یورو', 'euro'],
        callback_data: 'price_eur',
        function: async () => { const price = await getPriceOf('price_eur'); return price['current'] / 10; }
    },
    // پوند : price_gbp
    {
        text: '💵 پوند',
        keywords: ['پوند', 'pound'],
        callback_data: 'price_gbp',
        function: async () => { const price = await getPriceOf('price_gbp'); return price['current'] / 10; }
    },
    // درهم :‌ price_aed
    {
        text: '💵 درهم',
        keywords: ['درهم', 'aed'],
        callback_data: 'price_aed',
        function: async () => { const price = await getPriceOf('price_aed'); return price['current'] / 10; }
    },
    // روبل :‌ price_rub
    {
        text: '💵 روبل',
        keywords: ['روبل', 'rub'],
        callback_data: 'price_rub',
        function: async () => { const price = await getPriceOf('price_rub'); return price['current'] / 10; }
    },
    // لیر :‌ price_try
    {
        text: '💵 لیر',
        keywords: ['لیر', 'try'],
        callback_data: 'price_try',
        function: async () => { const price = await getPriceOf('price_try'); return price['current'] / 10; }
    },
    {
        text: '💵 بیت کوین',
        keywords: ['بیت کوین', 'bitcoin'],
        callback_data: 'crypto-bitcoin',
        function: async () => { const price = await getPriceOf('crypto-bitcoin'); return price['toman']; }
    },
    {
        text: '💵 تتر',
        keywords: ['تتر', 'tether'],
        callback_data: 'tether',
        function: async () => { const price = await getPriceOfTether(); return price['current']; }
    },
    {
        text: '💵 سکه تمام',
        keywords: ['سکه تمام', 'سکه', 'sekeb'],
        callback_data: 'sekeb',
        function: async () => { const price = await getPriceOf('sekeb'); return price['current'] / 10; }
    },
    {
        text: '💵 سکه نیم',
        keywords: ['سکه نیم', 'نیم سکه', 'nim'],
        callback_data: 'nim',
        function: async () => { const price = await getPriceOf('nim'); return price['current'] / 10; }

    },
    {
        text: '💵 سکه ربع',
        keywords: ['سکه ربع', 'ربع سکه', 'رب سکه', 'سکه رب', 'rob'],
        callback_data: 'rob',
        function: async () => { const price = await getPriceOf('rob'); return price['current'] / 10; }

    }
];

// const axios = require('axios');
import axios from 'axios';
// const moment = require('jalali-moment');
import moment from 'jalali-moment';
// const TelegramBot = require('node-telegram-bot-api');
import TelegramBot from 'node-telegram-bot-api';
// const persianSwear = require('persian-swear-words').default;
import persianSwear from 'persian-swear-words';

const bot = new TelegramBot(telegram_bot_token, { polling: true });

const getPriceOf = async (key) => {
    try {
        const result = await axios.get(`https://api.ohmyapi.com/v1/call/currency.get?key=${key}&apiKey=${ohmyapi_api_key}`);

        if (result.status != 200 || result.data.ok == false) {
            return null
        }

        return result.data.currency;
    } catch (error) {
        return null
    }
}

const getPriceOfTether = async () => {
    try {
        const result = await axios.get(`https://api.ohmyapi.com/v1/call/currency.tetherland?apiKey=${ohmyapi_api_key}`);

        if (result.status != 200 || result.data.ok == false) {
            return null
        }

        return result.data.currency;
    } catch (error) {
        return null
    }
}

const formatPrice = (price) => new Number(price).toLocaleString('fa-IR');

const makeNowMessage = () => {
    const now = moment.utc().locale('fa');

    now.add(3, 'hours');
    now.add(30, 'minutes');

    const message = `⏰ الان ${now.format('HH:mm')} ${now.format('dddd DD MMMM YYYY')} هست`;

    return message;
}

const makeChannelMessage = async () => {
    const keys = ['sekeb', 'nim', 'rob', 'price_dollar_rl', 'crypto-bitcoin'];

    const prices = await Promise.all(keys.map((key) => getPriceOf(key)));

    const tether = await getPriceOfTether();

    const now = moment.utc().locale('fa');

    now.add(3, 'hours');
    now.add(30, 'minutes');

    const message = `
📊 قیمت ها رو براتون درآوردم

💵 قیمت دلار شده ${formatPrice(prices[3].current / 10)} تومان
💵 قیمت بیت کوین هست ${formatPrice(prices[4].toman)} تومان
💵 قیمت تتر هستش ${formatPrice(tether.current)} تومان
💵 قیمت سکه تمام به تومان شده ${formatPrice(prices[0].current / 10)} تومان
💵 قیمت سکه نیم به تومان شده ${formatPrice(prices[1].current / 10)} تومان
💵 قیمت سکه ربع به تومان شده ${formatPrice(prices[2].current / 10)} تومان

${makeNowMessage()}

عزیزان دل من کانال رو به دوستاتون معرفی کنید
که همه از این اطلاعات استفاده کنند 🙏

📣 @nanejibi

اگر هم دنبال قیمت های دیگری هستی
یه سر به خودم بزن منتظرتم
🤖 @nanejibbot
    ‍‍`.trim();

    return message;
}

const sendIntervalMessage = async () => {
    const message = await makeChannelMessage();

    bot.sendMessage(telegram_channel_id, message);

    setTimeout(sendIntervalMessage, telegram_message_timeout);
}

const sendOnStartMessage = (chatId) => {
    const message = `
👋 سلام ننه جون خوش آمدی پیش من

من قیمت هر ارز و سکه رو تو جیبم دارم
چی می خوای بهت بگم ؟

❤️ قربونت برم من
`.trim();

    bot.sendMessage(chatId, message, {
        reply_markup: {
            'keyboard': makeKeyborad(),
        }
    });
}

const makeKeyborad = (rows = 3) => {
    // break keyboard into rows
    const keyboard = [];

    for (let i = 0; i < telegram_keyboard.length; i += rows) {
        keyboard.push(telegram_keyboard.slice(i, i + rows));
    }

    return keyboard;
}

sendIntervalMessage();

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    sendOnStartMessage(chatId);
});

// bot on recive message from user that message text be one of keyboard text
bot.on('text', async (msg) => {
    if (msg.text.trim().startsWith('/')) return;

    const chatId = msg.chat.id;

    if (msg.text == 'کی تو رو ساخته') {
        bot.sendMessage(chatId, 'من توسط @iammhmirzaei برنامه نویسی شدم 🤖');
        return;
    }

    if (persianSwear.hasSwear(msg.text)) {
        bot.sendMessage(chatId, '🫢 ننه جون یکم با ادب رو رعایت کن');
        return
    }

    const messageText = msg.text.trim();

    let keyboard = telegram_keyboard.find((key) => {
        return key.text == messageText || key.keywords.includes(messageText.replace('💵 ', ''));
    });

    if (keyboard == null) {
        keyboard = telegram_keyboard.find((key) => {
            return messageText.split(' ').some((word) => key.keywords.includes(word));
        });
    }

    if (keyboard == null) {
        bot.sendMessage(chatId, '😞 نفهمیدم چی می خواهی\n\nبهتره با این دکمه هایی که بهت دادم\nبهم بگی چی می خوای', {
            reply_markup: {
                'keyboard': makeKeyborad(),
            },
        });
        return
    };

    const sent_message = await bot.sendMessage(chatId, '🔎 دارم برات جدیدترین قیمت رو درمیارم ننه جان', {
    });

    const price = await keyboard.function();

    if (price == null) {
        bot.sendMessage(chatId, '😞 متاسفانه قیمت رو نتونستم برات بیارم');
        return;
    }

    const message = `
📊 قیمت ${keyboard.text.replace('💵 ', '')} ${formatPrice(price)} تومان الان هستش

${makeNowMessage()}

🤖 @nanejibbot
`.trim();

    // edit sent_message with new one
    bot.editMessageText(message, {
        chat_id: chatId,
        message_id: sent_message.message_id,
    });
});