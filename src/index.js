require('dotenv/config')

const ohmyapi_api_key = process.env['OHMYAPI_API_KEY'];
const telegram_bot_token = process.env['TELEGRAM_BOT_TOKEN'];
const telegram_channel_id = process.env['TELEGRAM_CHANNEL_ID'];
const telegram_message_timeout = 1000 * 60 * 60 * 3;

const telegram_keyboard = [
    {
        text: '💵 دلار',
        keywords: ['دلار', 'dollar'],
        callback_data: 'united-states-dollar',
        function: async () => getPriceOf('united-states-dollar')
    },
    {
        text: '💵 یورو',
        keywords: ['یورو', 'euro'],
        callback_data: 'euro',
        function: async () => getPriceOf('euro')
    },
    {
        text: '💵 پوند',
        keywords: ['پوند', 'pound'],
        callback_data: 'pound-sterling',
        function: async () => getPriceOf('pound-sterling')
    },
    {
        text: '💵 درهم',
        keywords: ['درهم', 'dirham'],
        callback_data: 'united-arab-emirates-dirham',
        function: async () => getPriceOf('united-arab-emirates-dirham')
    },
    {
        text: '💵 روبل',
        keywords: ['روبل', 'ruble'],
        callback_data: 'russian-ruble',
        function: async () => getPriceOf('russian-ruble')
    },
    {
        text: '💵 لیر',
        keywords: ['لیر', 'lir'],
        callback_data: 'turkish-lira',
        function: async () => getPriceOf('turkish-lira')
    },
    {
        text: '💵 کرون',
        keywords: ['کرون', 'krona'],
        callback_data: 'swedish-krona',
        function: async () => getPriceOf('swedish-krona')
    },
    {
        text: '💵 وون',
        keywords: ['وون', 'won'],
        callback_data: 'south-korean-won',
        function: async () => getPriceOf('south-korean-won')
    },
    {
        text: '💵 دلار کانادا',
        keywords: ['کانادا', 'canada'],
        callback_data: 'canadian-dollar',
        function: async () => getPriceOf('canadian-dollar')
    },
    {
        text: '₿ بیت کوین',
        keywords: ['بیت کوین', 'bitcoin'],
        callback_data: 'bitcoin',
        function: async () => getPriceOf('bitcoin')
    },
    {
        text: '₿ تتر',
        keywords: ['تتر', 'tether'],
        callback_data: 'tether',
        function: async () => getPriceOf('tether')
    },
    {
        text: '₿ اتریوم',
        keywords: ['اتریوم', 'ethereum'],
        callback_data: 'ethereum',
        function: async () => getPriceOf('ethereum')
    },
    {
        text: '₿ سولانا',
        keywords: ['سولانا', 'solana'],
        callback_data: 'solana',
        function: async () => getPriceOf('solana')
    },
    {
        text: '₿ دوج کوین',
        keywords: ['دوج کوین', 'dogecoin'],
        callback_data: 'dogecoin',
        function: async () => getPriceOf('dogecoin')
    },
    {
        text: '₿ ترون',
        keywords: ['ترون', 'tron'],
        callback_data: 'tron',
        function: async () => getPriceOf('tron')
    },
    {
        text: '🪙 سکه تمام',
        keywords: ['سکه تمام', 'سکه', 'seke', 'tamam'],
        callback_data: 'azadi-gold-full',
        function: async () => getPriceOf('azadi-gold-full')
    },
    {
        text: '🪙 سکه نیم',
        keywords: ['سکه نیم', 'نیم سکه', 'nim'],
        callback_data: 'azadi-gold-half',
        function: async () => getPriceOf('azadi-gold-half')

    },
    {
        text: '🪙 سکه ربع',
        keywords: ['سکه ربع', 'ربع سکه', 'رب سکه', 'سکه رب', 'rob'],
        callback_data: 'azadi-gold-quarter',
        function: async () => getPriceOf('azadi-gold-quarter')
    },
    {
        text: '🪙 طلای آبشده',
        keywords: ['طلا آبشده', 'طلا', 'tala'],
        callback_data: 'melted-gold-mithqal',
        function: async () => getPriceOf('melted-gold-mithqal')
    },
    {
        text: '🪙 سکه امامی',
        keywords: ['امامی', 'emami'],
        callback_data: 'emami-gold',
        function: async () => getPriceOf('emami-gold')
    },
    {
        text: '📣 عضویت در کانال ننه جیب',
        keywords: ['کانال', 'عضویت'],
        callback_data: 'join-to-channel'
    },
];

const axios = require('axios');
const moment = require('jalali-moment');
const TelegramBot = require('node-telegram-bot-api');
const persianSwear = require('persian-swear-words').default;

const bot = new TelegramBot(telegram_bot_token, { polling: true });

const sleep = (timeout = 1000) => new Promise((resolve) => setTimeout(resolve, timeout))

const getPriceOf = async (key) => {
    try {
        const result = await axios.get(`https://api.ohmyapi.com/v1/call/currency.price.get?key=${key}&apiKey=${ohmyapi_api_key}`);

        if (result.status != 200 || result.data.ok == false) {
            return null
        }

        return result.data.currency;
    } catch (error) {
        return null
    }
}


const formatPrice = (price) => new Number(Math.floor(price)).toLocaleString('fa-IR').split('٬').join(',');

const makeNowMessage = () => {
    const now = moment.utc().locale('fa');

    now.add(3, 'hours');
    now.add(30, 'minutes');

    const message = `⏰ الان ${now.format('HH:mm')} ${now.format('dddd DD MMMM YYYY')} هست`;

    return message;
}

const makeChannelMessage = async () => {
    const keys = ['azadi-gold-full', 'azadi-gold-half', 'azadi-gold-quarter', 'united-states-dollar', 'bitcoin', 'tether', 'melted-gold-mithqal', 'euro', 'pound-sterling', 'united-arab-emirates-dirham', 'turkish-lira', 'russian-ruble', 'ethereum'];

    const prices = await Promise.all(keys.map((key) => getPriceOf(key)));

    const now = moment.utc().locale('fa');

    now.add(3, 'hours');
    now.add(30, 'minutes');

    const status = (change) => (change === 0 ? '🟨' : change < 0 ? '🔻' : '🔺') + ` ${Math.floor(change)}%`;

    const format = (index) => `${status(prices[index].price.price_change_percent_24h)} قیمت ${prices[index].name} شده ${formatPrice(prices[index].price.price_irt)} تومان`

    const message = `
📊 قیمت ها رو براتون درآوردم

💵 ارز های جهانی 
${format(3)}
${format(7)}
${format(8)}
${format(9)}
${format(10)}
${format(11)}

₿ ارز های دیجیتال
${format(5)}
${format(4)}
${format(12)}

🪙 سکه و طلا
${format(0)}
${format(1)}
${format(2)}
${format(6)}

${makeNowMessage()}

عزیزان دل من کانال رو به دوستاتون معرفی کنید
که همه از این اطلاعات استفاده کنند 🙏

📣 @nanejibi
    ‍‍`.trim();

    return message;
}

const sendIntervalMessage = async () => {
    const message = await makeChannelMessage();

    bot.sendMessage(telegram_channel_id, message, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '🤖 یه سر به خودم بزن',
                        url: 'https://t.me/nanejibbot'
                    }
                ]
            ]
        }
    });

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

const makeJoinMessage = () => {
    return `ننه جان قربانت یه سر به کانال تلگرامی من بزن و عضو شو و من هر چند وقت یک بار بهت از آخرین وضعیت بازار خبر میدم. 🤗`;
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

    if (msg.text == 'سلام') {
        bot.sendMessage(chatId, '👋', {
            reply_markup: {
                keyboard: makeKeyborad()
            }
        });
        return;
    }

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

    if (keyboard.callback_data == 'join-to-channel') {
        bot.sendMessage(chatId, makeJoinMessage(), {
            reply_markup: {
                // 'keyboard': makeKeyborad(),
                'inline_keyboard': [
                    [
                        {
                            text: '📣 عضویت در کانال',
                            url: 'https://t.me/nanejibi'
                        }
                    ]
                ]
            },
        });
        return;
    }

    const sent_message = await bot.sendMessage(chatId, '🔎 دارم برات جدیدترین قیمت رو درمیارم ننه جان', {});

    const price = await keyboard.function();

    if (price == null) {
        await sleep(1000);
        bot.editMessageText('😞 متاسفانه قیمت رو نتونستم برات بیارم', {
            chat_id: chatId,
            message_id: sent_message.message_id,
        });
        return;
    }

    const status = (change) => (change === 0 ? '🟨' : change < 0 ? '🔻' : '🔺') + ` ${Math.floor(change)}%`;

    const message = `
📊 قیمت ${price.name} الان ${formatPrice(price.price.price_irt)} تومان هست که ${status(price.price.price_change_percent_24h)} تغییرات داشته

${makeNowMessage()}

🤖 @nanejibbot
`.trim();

    // edit sent_message with new one
    bot.editMessageText(message, {
        chat_id: chatId,
        message_id: sent_message.message_id,
    });
});
