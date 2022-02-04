require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT

//Database
const db = require('./config/Database')
const User = require("./models/userModel")
const Product = require('./models/productsModel')
const Brand = require('./models/brandModel')
const Type = require('./models/typeModel')

//Router
const userRouter = require('./routes/userRoutes')

//Json
app.use(express.json())

//Routes
app.use('/api/v1/', userRouter)


//Initial DB
db.authenticate().then(() => {
    console.log("DB Connection Success")
    //Sync DB || Delete Table -> Exec Sync
    User.sync()
    Product.sync()
    Brand.sync()
    Type.sync()
})

app.listen(PORT, () => console.log("Server Running At Port " + PORT))