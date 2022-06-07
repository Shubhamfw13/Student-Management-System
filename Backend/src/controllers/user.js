const {authorisation} = require("./verify")
const router = require("express").Router();
const User = require("../models/facultyModel");
const hashed = require("crypto-js");
const jwt = require("jsonwebtoken");;

router.patch("/:id",authorisation, async (req, res) => {
    // https://gamersparadisee.herokuapp.com/users/_id
    if (req.body.password) {
      req.body.password = hashed.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString();
    }
    try {
      const update = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(update);
    } catch (err) {
      res.status(500).send({ Error: err.message });
    }
  }); 

  router.get("/find/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate({path:"student_id"}).lean().exec();
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send({ Error: err.message });
    }
  });
  

  module.exports = router