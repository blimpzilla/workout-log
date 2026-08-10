const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.get("/", (req, res) => {
    res.send("Workouts");
});

router.get("/workouts", async (req, res) => {
    try {
    const allWorkouts = await Workout.find({});
    // Renders a 'workouts/index.ejs' file and passes the database data to it
    res.render("workouts/index", { workouts: allWorkouts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading workouts");
  }
})

router.get("/workouts/new", (req, res) => {
    // get new workout form
    res.render("workouts/new");
})

router.post("/workouts", async (req,res) => {
    // POST   /workouts (add validated submission to db)
    try {
    const newWorkout = await Workout.create(req.body.workout);
    // Redirects the user to the newly created workout's page
    res.redirect(`/workouts/${newWorkout._id}`);
  } catch (err) {
    console.error(err);
    // If it fails, reload the form
    res.render("workouts/new");
});

router.get("/workouts/:id", async (req, res) => {
    // GET    /workouts/:id (get workout by id)
    try {
    const foundWorkout = await Workout.findById(req.params.id);
    res.render("workouts/show", { workout: foundWorkout });
  } catch (err) {
    console.error(err);
    res.redirect("/workouts");
  }
});

router.get("/workouts/:id/edit", async (req,res) => {
    // GET    /workouts/:id/edit
    try {
    const foundWorkout = await Workout.findById(req.params.id);
    res.render("workouts/edit", { workout: foundWorkout });
  } catch (err) {
    console.error(err);
    res.redirect("/workouts");
  }
});

router.put("/workouts/:id", async (req, res) => {
    // PUT    /workouts/:id
    try {
    await Workout.findByIdAndUpdate(req.params.id, req.body.workout);
    res.redirect(`/workouts/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.redirect("/workouts");
  }
});

router.delete("/workouts/:id", async (req, res) => {
    // DELETE /workouts/:id
    try {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect("/workouts");
  } catch (err) {
    console.error(err);
    res.redirect("/workouts");
  }
});



module.exports = router;
