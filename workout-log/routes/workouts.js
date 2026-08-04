const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Workouts");
});

router.get("/workouts", (req, res) => {
    // show all workouts
})

router.get("/workouts/new", (req, res) => {
    // get new workout form
})

// POST   /workouts (add validated submission to db)

// GET    /workouts/:id (get workout by id)

// GET    /workouts/:id/edit

// PUT    /workouts/:id

// DELETE /workouts/:id



module.exports = router;