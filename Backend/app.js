const express = require("express");
const app = express();
const connect = require("./src/config/db");
const studentauthController = require("./src/controllers/studentauthController")
const facultyauthController = require("./src/controllers/facultyauthcontroller")
const getAllUsersController = require("./src/controllers/user")

app.use(express.json())
app.use("/studentauth",studentauthController)
app.use("/facultyauth",facultyauthController)
app.use("/user",getAllUsersController)


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
