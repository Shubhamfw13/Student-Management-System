const express = require("express");
const app = express();
const connect = require("./src/config/db");
const studentauthController = require("./src/controllers/studentauthController")
const facultyauthController = require("./src/controllers/facultyauthcontroller")
const getAllUsersController = require("./src/controllers/user")
const eventController = require("./src/controllers/eventController")
const assignmentController = require("./src/controllers/assignmentController")
const cors = require("cors");
app.use(cors({ origin: "*" }));

app.use(express.json())
app.use("/studentauth",studentauthController)
app.use("/facultyauth",facultyauthController)
app.use("/user",getAllUsersController)
app.use("/event",eventController) 
app.use("/assignment",assignmentController)


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
