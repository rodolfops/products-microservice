const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
let config = require("./config/config.json");

const app = express();

mongoose.connect(config.mongoConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(8086);
