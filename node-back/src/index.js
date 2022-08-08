const express = require("express");
const cors = require("cors");
const router = require("./router");

require("dotenv").config();

const app = express();

app.listen(8000, (err) => {
  console.log("Server started at localhost:8000");
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.options("*", cors());

app.use("/api", router);

app.use((req, res, next) => {
  res.status(404).send("Not found");
});
