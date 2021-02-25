require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = `Hello! Thanks for contacting jackbot! type messages to continue`
  bot.sendMessage(chatId, resp);
});


bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text == "dog") {
    bot.sendMessage(chatId, "You sent 'dog'");
  }
});

