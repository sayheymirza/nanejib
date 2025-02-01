require('dotenv/config')

const ohmyapi_api_key = process.env['OHMYAPI_API_KEY'];
const telegram_bot_token = process.env['TELEGRAM_BOT_TOKEN'];
const telegram_channel_id = process.env['TELEGRAM_CHANNEL_ID'];
const telegram_message_timeout = 1000 * 60 * 60 * 3;

const telegram_keyboard = [
    {
        text: '🥛 دوغ آبعلی',
        keywords: ['دوغ', 'dooq', 'doogh'],
        callback_data: 'dooq-abali',
        type: 'product',
        function: async () => getProductOf('6262916600154')
    },
    {
        text: '🍢 کباب کوبیده',
        keywords: ['کباب', 'kabab'],
        callback_data: 'kabab',
        type: 'product',
        function: async () => getProductOf('6260161414311')
    },
    {
        text: '🍕 پیتزا',
        keywords: ['پیتزا', 'pizza'],
        callback_data: 'pizza',
        type: 'product',
        function: async () => getProductOf('6260161406545')
    },
    {
        text: '🧊 آب',
        keywords: ['آب', 'water'],
        callback_data: 'water',
        type: 'product',
        function: async () => getProductOf('6263768900065')
    },
    {
        text: '🍫 شکلات هوبی',
        keywords: ['شکلات', 'هوبی', 'chocolate'],
        callback_data: 'chocolate',
        type: 'product',
        function: async () => getProductOf('8690504027010')
    },
    {
        text: '🍦 بستنی عروسکی',
        keywords: ['بستنی', 'icecream'],
        callback_data: 'icecream',
        type: 'product',
        function: async () => getProductOf('6260176822101')
    },
    {
        text: '💵 دلار',
        keywords: ['دلار', 'dollar'],
        callback_data: 'united-states-dollar',
        type: 'currency',
        function: async () => getPriceOf('united-states-dollar')
    },
    {
        text: '💵 یورو',
        keywords: ['یورو', 'euro'],
        callback_data: 'euro',
        type: 'currency',
        function: async () => getPriceOf('euro')
    },
    {
        text: '💵 پوند',
        keywords: ['پوند', 'pound'],
        callback_data: 'pound-sterling',
        type: 'currency',
        function: async () => getPriceOf('pound-sterling')
    },
    {
        text: '💵 درهم',
        keywords: ['درهم', 'dirham'],
        callback_data: 'united-arab-emirates-dirham',
        type: 'currency',
        function: async () => getPriceOf('united-arab-emirates-dirham')
    },
    {
        text: '💵 روبل',
        keywords: ['روبل', 'ruble'],
        callback_data: 'russian-ruble',
        type: 'currency',
        function: async () => getPriceOf('russian-ruble')
    },
    {
        text: '💵 لیر',
        keywords: ['لیر', 'lir'],
        callback_data: 'turkish-lira',
        type: 'currency',
        function: async () => getPriceOf('turkish-lira')
    },
    {
        text: '💵 کرون',
        keywords: ['کرون', 'krona'],
        callback_data: 'swedish-krona',
        type: 'currency',
        function: async () => getPriceOf('swedish-krona')
    },
    {
        text: '💵 وون',
        keywords: ['وون', 'won'],
        callback_data: 'south-korean-won',
        type: 'currency',
        function: async () => getPriceOf('south-korean-won')
    },
    {
        text: '💵 دلار کانادا',
        keywords: ['کانادا', 'canada'],
        callback_data: 'canadian-dollar',
        type: 'currency',
        function: async () => getPriceOf('canadian-dollar')
    },
    {
        text: '₿ بیت کوین',
        keywords: ['بیت کوین', 'bitcoin'],
        callback_data: 'bitcoin',
        type: 'currency',
        function: async () => getPriceOf('bitcoin')
    },
    {
        text: '₿ تتر',
        keywords: ['تتر', 'tether'],
        callback_data: 'tether',
        type: 'currency',
        function: async () => getPriceOf('tether')
    },
    {
        text: '₿ اتریوم',
        keywords: ['اتریوم', 'ethereum'],
        callback_data: 'ethereum',
        type: 'currency',
        function: async () => getPriceOf('ethereum')
    },
    {
        text: '₿ سولانا',
        keywords: ['سولانا', 'solana'],
        callback_data: 'solana',
        type: 'currency',
        function: async () => getPriceOf('solana')
    },
    {
        text: '₿ دوج کوین',
        keywords: ['دوج کوین', 'dogecoin'],
        callback_data: 'dogecoin',
        type: 'currency',
        function: async () => getPriceOf('dogecoin')
    },
    {
        text: '₿ ترون',
        keywords: ['ترون', 'tron'],
        callback_data: 'tron',
        type: 'currency',
        function: async () => getPriceOf('tron')
    },
    {
        text: '🪙 سکه تمام',
        keywords: ['سکه تمام', 'سکه', 'seke', 'tamam'],
        callback_data: 'azadi-gold-full',
        type: 'currency',
        function: async () => getPriceOf('azadi-gold-full')
    },
    {
        text: '🪙 سکه نیم',
        keywords: ['سکه نیم', 'نیم سکه', 'nim'],
        callback_data: 'azadi-gold-half',
        type: 'currency',
        function: async () => getPriceOf('azadi-gold-half')

    },
    {
        text: '🪙 سکه ربع',
        keywords: ['سکه ربع', 'ربع سکه', 'رب سکه', 'سکه رب', 'rob'],
        callback_data: 'azadi-gold-quarter',
        type: 'currency',
        function: async () => getPriceOf('azadi-gold-quarter')
    },
    {
        text: '🪙 طلای آبشده',
        keywords: ['طلا آبشده', 'طلا', 'tala'],
        callback_data: 'melted-gold-mithqal',
        type: 'currency',
        function: async () => getPriceOf('melted-gold-mithqal')
    },
    {
        text: '🪙 سکه امامی',
        keywords: ['امامی', 'emami'],
        callback_data: 'emami-gold',
        type: 'currency',
        function: async () => getPriceOf('emami-gold')
    },
    {
        text: '📣 عضویت در کانال ننه جیب',
        keywords: ['کانال', 'عضویت'],
        callback_data: 'join-to-channel',
        type: 'text',
        function: () => makeJoinMessage(),
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

const getProductOf = async (barcode) => {
    try {
        const result = await axios.get(`https://api.ohmyapi.com/v1/call/product.scan?code=${barcode}&apiKey=${ohmyapi_api_key}`);

        if (result.status != 200 || result.data.ok == false) {
            return null
        }

        return result.data.product;
    } catch (error) {
        return null;
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



    if (keyboard.text == 'text') {
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
        }
    }


    if (keyboard.type == 'currency') {
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
        📊 قیمت ${price.name} الان ${formatPrice(price.price.price_irt)} تومان هست که ${status(price.price.price_change_percent_24h)} تغییرات داشته\n${makeNowMessage()}\n
        🤖 @nanejibbot
        `.trim();

        // edit sent_message with new one
        bot.editMessageText(message, {
            chat_id: chatId,
            message_id: sent_message.message_id,
        });
    }

    if (keyboard.type == 'product') {
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

        const message = `
        ${keyboard.text} الان اگر بخوای بخری باید ${formatPrice(price.price)} تومان بپردازی.\n${makeNowMessage()}
        🤖 @nanejibbot
        `.trim();

        // edit sent_message with new one
        bot.editMessageText(message, {
            chat_id: chatId,
            message_id: sent_message.message_id,
        });
    }
});
