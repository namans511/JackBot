const fetch = require("node-fetch");
const Message = require("./models/message");

exports.getResponse = async (msg) => {
  let reply = "itterashai";
  if (process.env.CHATTERBOT_STATUS == "on") {
    text = msg.text;
    const body = { data: text };
    const chatbotUrl =
      process.env.CHATTTERBOT_API_URL || "http://127.0.0.1:5000";

    const url = chatbotUrl + "/service";
    console.log("url=", url);
    const res = await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    reply = json.text;
  } else {
    const test = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const testJson = await test.json();
    // reply = testJson.title;
    reply = msg.text;
  }

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

exports.names = () => {
  let names = process.env.NAMES;
  var reg = new RegExp(names, "gi");
  return reg;
  let namesReg = [reg];
  // var reg;
  // names.forEach((name) => {
  //   reg = new RegExp(name, "gi");
  //   namesReg.push(reg);
  // });
  return namesReg;
};

exports.filter = (res, names) => {
  // names.forEach((name) => {
  //   res = res.replace(name, "\b");
  // });
  res = res.replace(names, "\b");
  return res;
};
