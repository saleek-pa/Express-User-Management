const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/user_management", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
    console.log("Connected Successfully");
});

const userRouter = require('./routes/userRoutes')
app.use('/users', userRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})