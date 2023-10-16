const express = require('express');
const mongoose = require('mongoose');
const app = express()
require('dotenv').config();
const userRouter = require('./routes/userRoutes')

app.use(express.json());
app.use('/', userRouter)

mongoose.connect("mongodb://127.0.0.1:27017/user_management", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
    console.log("Connected Successfully");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})