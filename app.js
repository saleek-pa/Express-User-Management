const express = require('express');
const app = express()

const userRouter = require('./routes/userRoutes')

app.use(express.json());
app.use('/users', userRouter)

app.listen(3000, () => {
    console.log("Server Running")
})