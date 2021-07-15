const db = require("../models");


module.exports = function(app) {


  app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(Workout => {
        res.json(Workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
})

app.get("/api/workouts/range", ({}, res) => {
  db.Workout.aggregate([{
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

  // app.get("/api/workouts", (req, res) => {
  //     Workout.aggregate([
	// 	  {
	// 		  $addFields:{
	// 			  $sum:"$excercises.duration",
	// 			  },
	// 		  },
	// 	  },
	// 	  ])
	// 	  .then((dbWorkout) => {
  //         res.json(dbWorkout);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //         res.status(400).json(err);
  //     });
  // })

  // app.get("/api/workouts/range", ({}, res) => {
	//   Workout.aggregate([
	//   		  {
	//   			  $addFields:{
	//   				  $sum:"$excercises.duration",
	//   				  },
	//   			  },
	//   		  },
	// 	  ])
	// then((dbWorkout) => {
  //     res.json(dbWorkout);
  //   }).catch(err => {
  //     console.log(err);
  //     res.status(400).json(err);
  //   });
  // });

  
  app.post("/api/workouts/", (req, res) => {
      db.Workout.create(req.body).then((Workout) => {
        res.json(Workout);
      }).catch(err => {
        console.log(err);
          res.status(400).json(err);
        });
    });

    app.put("/api/workouts/:id", (req, res) => {
      db.Workout.findByIdAndUpdate(
        { _id: req.params.id }, { exercises: req.body }
      ).then((Workout) => {
        res.json(Workout);
      }).catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });
};

