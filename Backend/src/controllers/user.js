const {authorisation} = require("./verify")
const router = require("express").Router();
const User = require("../models/facultyModel");
const Students = require("../models/studentModel");
const hashed = require("crypto-js");
const jwt = require("jsonwebtoken");;

router.patch("/:id", async (req, res) => {
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

  router.get("/find", async (req, res) => {
    try {
      const students = await Students.find().lean().exec();
      res.status(200).send(students);
    } catch (err) {
      res.status(500).send({ Error: err.message });
    }
  });

  router.get("/search",async (req,res)=>{
    const query = req.query.query
    const type = req.query.type
    let filter = {username:query}
    switch (type) {
      case "username":
        filter ={username:query}
        break;
      case "email":
        filter = {email:query}
        break;
      case "roll":
        filter = {rollnumber: Number(query) || -1}
        break
      case "term":
        filter = {term: query}
        break
      default:
        filter = {username:query}
        break;
    }
    try {
      const users = await Students.find({
        $or: [filter]
      }).lean().exec()
      console.log(users)
    return res.status(200).send({users})
    }catch(err) {
      console.log(err)
      return res.status(500).send(err)
    }
  })
  

  module.exports = router