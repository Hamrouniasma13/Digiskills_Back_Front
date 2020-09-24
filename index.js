require("express-async-errors");
const express = require("express");
const winston = require("winston");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const keys = require("./Config/keys");
const user = require("./Routes/user");
const auth = require("./Routes/auth");
const course = require("./Routes/course");
const modules = require("./Routes/module");
const content = require("./Controllers/Module/addContent");
const training = require("./Routes/training");
const quiz = require("./Routes/quiz");
const answer = require("./Routes/answer");
const certificate = require("./Routes/certificate");

app.get("/", async (req, res) => {
  res.send("Hello");
  console.log("Hi");
});

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Connected to Digits DB"))
  .catch(err => console.log("Error while connecting DB", err));

const port = process.env.PORT || 1000;

const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});

app.use(express.json());
app.use(cors());
app.use("/Image", express.static("Image"));
app.use("/File", express.static("File"));
app.use("/Video", express.static("Video"));
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/course", course);
app.use("/api/module", modules);
app.use("/api/content", content);
app.use("/api/training", training);
app.use("/api/quiz", quiz);
app.use("/api/answer", answer);
app.use("/api/certificate", certificate);

module.exports = server;
