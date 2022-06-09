const express = require("express");
const router = express.Router();
const Event = require("../models/eventModel");

router.post("", async (req, res) => {
  try {
    const event = await Event.create({
      student_id: req.body.student_id,
      eventname: req.body.eventname,
      eventdetails: req.body.eventdetails,
      start: req.body.start,
      end: req.body.end,
      eventstatus: req.body.eventstatus,
      register: req.body.register,
    });
    return res.status(201).send(event);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
// router.get("", crudController(Booking).getAll)

router.patch("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/register", async (req,res)=>{
  const event_id = req.body.event_id
  const student_id = req.body.student_id
  if(!event_id || !student_id){
    return res.status(400).send("Missing required parameters event id or student id")
  }

  try {
    const event = await Event.findOneAndUpdate({
      _id: event_id
    },{
      $addToSet: {
        student_id: student_id
      }
    }).lean().exec()
    return res.status(200).send("successfully updated")
  } catch (error) {
    
    return res.status(500).send(error);
  }
})

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate({ path: "student_id" })
      .lean()
      .exec();
    return res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("", async (req, res) => {
  const qLatest = req.query.new;
  const qStatus = req.query.status;
  console.log(qStatus, req.query);
  try {
    let event;
    if (qStatus) {
      event = await Event.find({
        eventstatus: {
          $in: [qStatus],
        },
      })
        .populate({ path: "student_id" })
        .lean()
        .exec();
    } else {
      event = await Event.find().populate({ path: "student_id" }).lean().exec();
    }

    res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
