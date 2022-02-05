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
const productRouter = require('./routes/productRoutes')
const brandRouter = require('./routes/brandRoutes')
const typeRouter = require('./routes/typeRoutes')

//Json
app.use(express.json())

//Routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/brand', brandRouter)
app.use('/api/v1/type', typeRouter)


//Initial DB
db.authenticate().then(() => {
    console.log("DB Connection Success")
    //Sync DB || Delete Table -> Exec Sync
    User.sync({ alter: true })
    Product.sync({ alter: true })
    Brand.sync({ alter: true })
    Type.sync({ alter: true })
})

app.listen(PORT, () => console.log("Server Running At Port " + PORT))