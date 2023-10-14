const express = require('express');
const mongoose = require('mongoose');
const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/example");

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//     console.log("Connected successfully");
// });

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const userModel = new mongoose.model("User", userSchema)

const userRouter = require('./routes/userRoutes')

app.use(express.json());
app.use('/users', userRouter)

app.listen(3000, () => {
    console.log("Server Running")
})