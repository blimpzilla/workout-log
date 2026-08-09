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

router.post("/workouts", (req,res) => {
// POST   /workouts (add validated submission to db)
});

router.get("/workouts/:id", (req, res) => {
// GET    /workouts/:id (get workout by id)
});

router.get("/workouts/:id/edit", (req,res) => {
// GET    /workouts/:id/edit
});

router.put("/workouts/:id", (req, res) => {
// PUT    /workouts/:id
});

router.delete("/workouts/:id", (req, res) => {
// DELETE /workouts/:id
});



module.exports = router;
