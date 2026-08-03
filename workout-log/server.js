require("dotenv").config();
const PORT = process.env.PORT;


const express = require("express");
const app = express();

app.use(express.static("public")); 

app.set("view engine", "pug");

const workoutRouter = require("./routes/workouts.js");
app.use("/workouts", workoutRouter);

app.get("/", (req, res) => {
    res.render("index")
})

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connection Successful!");
        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("Connection Failed: ", error.message);
    });



