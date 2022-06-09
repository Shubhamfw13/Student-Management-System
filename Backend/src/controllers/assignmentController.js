const express = require("express");
const router = express.Router();
const Assignment = require("../models/assignment Model");

router.post("", async (req, res) => {
  try {
    const assignment = await Assignment.create({
      student_id: req.body.student_id,
      assignmentname: req.body.assignmentname,
      assignmentdetails: req.body.assignmentdetails,
      start: req.body.start,
      end: req.body.end,
      assignmentstatus: req.body.assignmentstatus,
    });
    return res.status(201).send(assignment);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
// router.get("", crudController(Booking).getAll)

router.patch("/mark-complete", async (req,res)=>{
  const assignment_id = req.body.assignment_id
  const student_id = req.body.student_id
  try {

     const assignment = await Assignment.findOneAndUpdate({_id:assignment_id},{
       $addToSet: {
         student_id: student_id
       }
     }).lean().exec()
     return res.status(200).send("successfully updated")
  } catch (err) {
   console.log(err)
    return res.status(500).send({ error: err.message });
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .lean()
      .exec();
    return res.status(200).send(assignment);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate({ path: "student_id" })
      .lean()
      .exec();
    return res.status(200).send(assignment);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("", async (req, res) => {
  const qLatest = req.query.new;
  const qStatus = req.query.status;
  console.log(qStatus, req.query);
  try {
    let assignment;
    if (qStatus) {
      assignment = await Assignment.find({
        assignmentstatus: {
          $in: [qStatus],
        },
      })
        .populate({ path: "student_id" })
        .lean()
        .exec();
    } else {
      assignment = await Assignment.find()
        .populate({ path: "student_id" })
        .lean()
        .exec();
    }

    res.status(200).send(assignment);
  } catch (error) {
    return res.status(500).send(error);
  }
});



module.exports = router;
