const router = require("express").Router();
const User = require("../models/studentModel");
const hashed = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {

  
  let user = await User.findOne({ email: req.body.email });
  let roll = await User.findOne({ roll: req.body.rollnumber });
  if (user && roll) {
    console.log("Email or Roll Already Taken");
    return res.status(400).send({ Error: "Email or Roll Already Exist" });
  } else {
    user = await User({
      username: req.body.username,
      email: req.body.email,
      rollnumber: req.body.rollnumber,
      contact: req.body.contact,
      term: req.body.term,
      currentyear: req.body.currentyear,
      role: req.body.role, 
      password: hashed.AES.encrypt(
        req.body.password,
        process.env.SECRET.toString()
      ),
    });
  }
  try {
    user.save();
    res.status(201).send(user);
    console.log("user created");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send("Wrong Credentials");
    }
    const password = hashed.AES.decrypt(
      user.password,
      process.env.SECRET
    ).toString(hashed.enc.Utf8);

    if (password != req.body.password) {
      return res.status(401).send("Wrong Credentials");
    }
    const token = jwt.sign(
      {
        id: user._id,
        admin: user.admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

   res.status(200).send({ user, token });
    console.log(user,token)
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
