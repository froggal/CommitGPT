require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const { OPENAI_API_KEY } = process.env;
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

app.use(bodyParser.json());
app.use(cors());

app.post("/create", async (req, res) => {
  const { prompt } = req.body;
  try {
    await openai.chat.completions.create({
      messages: [{ role: "system", content: `아래 내용을 커밋 메시지 형식으로, 영어로 번역하시오. ${prompt}` }],
      model: "gpt-3.5-turbo",
    });
    res.send(response.choices[0]);
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(3000, () => {
  console.log("server started");
});

module.exports = app;