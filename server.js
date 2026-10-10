const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const app = express();

const router = require("./users.routes.js");

app.use(express.json());

app.use("/users", router);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Error occurred while running the code"
    });
});

app.get("/", (req, res) => {
    res.send("Backend is running");
});

mongoose.connect(process.env.MONGO_URI)
     .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

