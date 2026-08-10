require("dotenv").config();
const PORT = process.env.PORT;


const express = require("express");
const app = express();
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public")); 

app.set("view engine", "pug");

const workoutRouter = require("./routes/workouts.js");
app.use("/workouts", workoutRouter);

app.get("/", (req, res) => {
    res.render("index")
})

app.use((req, res) => {
    res.status(404).render("404");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong");
});

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
