require("dotenv").config();
const fetch = require("node-fetch");
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

const chatbotUrl = process.env.CHATTTERBOT_API_URL || "http://127.0.0.1:5000";
bot.on("message", async (msg) => {
  try {
    const chatId = msg.chat.id;
    if (msg.text.startsWith("/")) return;
    //   if (msg.text == "dog") {
    //     bot.sendMessage(chatId, "You sent 'dog'");
    //   }
    text = msg.text;
    const body = { data: text };
    const url = chatbotUrl + "/service";
    console.log("url=", url);
    // const res = await fetch(url, {
    //   method: "post",
    //   body: JSON.stringify(body),
    //   headers: { "Content-Type": "application/json" },
    // });
    // const json = await res.json();
    // const reply = json.text;

    const test = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const testJson = await test.json();
    const reply = testJson.title;
    bot.sendMessage(chatId, reply);
  } catch (error) {
    console.error(error);
  }
});

bot.on("polling_error", (error) => {
  console.log(error); // => 'EFATAL'
});
