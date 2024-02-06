const express = require("express");
const bodyParser = require("body-parser");
const Producer = require("./producer");
const app = express();

const producer = new Producer();

app.use(bodyParser.json("/application/json"));

app.post("/sendLog", async (req, res, next) => {
  await producer.publishMessage(req.body.logType, req.body.message);
  res.send("Message published");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
