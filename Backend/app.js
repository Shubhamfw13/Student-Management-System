const express = require("express");
const app = express();
const connect = require("./src/config/db");

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Port ${port} is Live`);
    });
  } catch (error) {
    console.log({ ERROR: error.message });
  }
};

start();
