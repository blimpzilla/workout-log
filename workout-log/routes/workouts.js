const express = require("express");
const router = express.Router();
const Workout = require("../models/Workouts");

// GET /workouts
router.get("/", async (req, res) => {
    try {
        const allWorkouts = await Workout.find();
        res.render("index", { workouts: allWorkouts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading workouts");
    }
});

// GET /workouts/new
router.get("/new", (req, res) => {
    res.render("new", { workout: {} });
});

// POST /workouts
// router.post("/", async (req, res) => {
//     try {
//         const newWorkout = await Workout.create(req.body);
//         res.redirect(`/workouts/${newWorkout._id}`);
//     } catch (err) {
//         console.error(err);
//         res.render("new");
//     }
// });
router.post("/", async (req, res) => {
    console.log(req.body);

    try {
        const newWorkout = await Workout.create(req.body);
        res.redirect(`/workouts/${newWorkout._id}`);
    } catch (err) {
        console.error(err);
        res.status(400).render("new", {
            error: err.message,
            workout: req.body
        });
    }
});

// GET /workouts/:id
router.get("/:id", async (req, res) => {
    try {
        const foundWorkout = await Workout.findById(req.params.id);
        if (!foundWorkout) {
            return res.status(404).send("Workout not found");
        }
        res.render("workouts/show", { workout: foundWorkout });
    } catch (err) {
        console.error(err);
        res.redirect("/workouts");
    }
});

// GET /workouts/:id/edit
router.get("/:id/edit", async (req, res) => {
    try {
        const foundWorkout = await Workout.findById(req.params.id);
        if (!foundWorkout) {
            return res.status(404).send("Workout not found");
        }
        res.render("workouts/edit", { workout: foundWorkout });
    } catch (err) {
        console.error(err);
        res.redirect("/workouts");
    }
});

// PUT /workouts/:id
router.put("/:id", async (req, res) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true
        });

        if (!updatedWorkout) {
            return res.status(404).send("Workout not found");
        }

        res.redirect(`/workouts/${req.params.id}`);
    } catch (err) {
        console.error(err);
        res.redirect("/workouts");
    }
});

// DELETE /workouts/:id
router.delete("/:id", async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);

        if (!deletedWorkout) {
            return res.status(404).send("Workout not found");
        }

        res.redirect("/workouts");
    } catch (err) {
        console.error(err);
        res.redirect("/workouts");
    }
});

module.exports = router;
