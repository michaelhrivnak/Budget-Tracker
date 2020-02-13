const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const api = require("./routes/api");
const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// routes here
app.use(api);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});