require("dotenv").config();
const util = require("./util");
const mongoose = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");

TOKEN = process.env.BOT_TOKEN;
const names = util.names();

if (process.env.NODE_ENV === "production") {
  const options = {
    webHook: {
      port: process.env.PORT,
    },
  };
  bot = new TelegramBot(TOKEN, options);
  const herokuUrl = "https://jack-bot511.herokuapp.com:443";
  // console.log("heroku url", herokuUrl);
  bot.setWebHook(`${herokuUrl}/bot${TOKEN}`);
} else {
  bot = new TelegramBot(TOKEN, { polling: true });
}

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = `Hello! Thanks for contacting jackbot! Send messages to continue`;
  bot.sendMessage(chatId, resp);
});

bot.on("message", async (msg) => {
  try {
    // console.log(util.names());
    const chatId = msg.chat.id;
    if (msg.text.startsWith("/")) return;

    reply = await util.getResponse(msg);
    const filteredResponse = util.filter(reply, names);
    bot.sendMessage(chatId, filteredResponse);
    util.saveChat(msg, reply);
  } catch (error) {
    console.error(error);
  }
});

bot.on("polling_error", (error) => {
  console.log(error); // => 'EFATAL'
});

//connecting to mongodb database
mongoose
  .connect(process.env.MONGO_API_KEY, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });