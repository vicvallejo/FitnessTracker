const router = requiere("express").Router();
const Workout = require("../models/workout");





router.get("/api/workouts", (req, res) => {
    Workout.find({}).then(Workout => {
        res.json(Workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
})

router.get("/api/workouts/range", ({}, res) => {
  Workout.aggregate([{
    $addFields: {
      totalDuration:{
        $sum : "$excercises.duration",
      }
    }
    .sort({_id : -1})
    .limit(7)
  }]).then((Workout) => {
    res.json(Workout);
  }).catch(err => {
    res.status(400).json(err);
  });
});

  
  
  router.post("/api/workouts/", (req, res) => {
      Workout.create(req.body).then((Workout) => {
        res.json(Workout);
      }).catch(err => {
        console.log(err);
          res.status(400).json(err);
        });
    });

  router.put("/api/workouts/:id", (req, res) => {
      Workout.findByIdAndUpdate(
        { _id: req.params.id }, { exercises: req.body }
      ).then((Workout) => {
        res.json(Workout);
      }).catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });

