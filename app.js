require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT

//Database
const db = require('./config/Database')
const User = require("./models/userModel")

//Router
const userRouter = require('./routes/userRoutes')

//Json
app.use(express.json())

//Routes
app.use('/api/v1/', userRouter)


//Initial DB
db.authenticate().then(() => {
    console.log("DB Connection Success")
    User.sync()
})

app.listen(PORT, () => console.log("Server Running At Port " + PORT))