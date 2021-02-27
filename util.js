const fetch = require("node-fetch");
const Message = require("./models/message");

exports.getResponse = async (msg) => {
  //   text = msg.text;
  //   const body = { data: text };
  //   const chatbotUrl = process.env.CHATTTERBOT_API_URL || "http://127.0.0.1:5000";

  //   const url = chatbotUrl + "/service";
  // console.log("url=", url);
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

  return reply;
};

exports.saveChat = (msg, reply) => {
  Message.findOne({ chat_id: msg.from.id })
    .then((data) => {
      if (!data) {
        return Message.create({
          chat_id: msg.from.id,
          name: msg.from.first_name,
          username: msg.from.username,
          num: "5",
          messages: ["Q:" + msg.text, "A:" + reply],
        });
      }
      messages = data.messages;
      data.messages = [...messages, "Q:" + msg.text, "A:" + reply];
      return data.save();
    })
    .catch((error) => {
      console.error(error);
    });
};
