require("dotenv").config()
const express = require("express")
const cookieparser = require('cookie-parser')
const app = express()
const path = require('path')
const PORT = process.env.PORT

//Cookie Parser
app.use(cookieparser())

//Models
const db = require('./config/Database')
const User = require("./models/userModel")
const Product = require('./models/productsModel')
const Brand = require('./models/brandModel')
const Type = require('./models/typeModel')
const productImage = require('./models/productImagesModel')
const Wish = require('./models/wishModel')

//Router
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const brandRouter = require('./routes/brandRoutes')
const typeRouter = require('./routes/typeRoutes')
const tokenRoutes = require('./routes/tokenRoutes')
const wishRoutes = require('./routes/wishRoutes')



//Json
app.use(express.json())

//Make Public Folders
app.use('/', express.static('public'))

//Routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/brand', brandRouter)
app.use('/api/v1/type', typeRouter)
app.use('/api/v1/token', tokenRoutes)
app.use('/api/v1/wish', wishRoutes)


//Database
try {
    db.authenticate().then(async () => {
        console.log("DB Connection Success")
        //Sync DB || Delete Table -> Exec Sync
        await User.sync()
        await Brand.sync({ alter: true })
        await Type.sync({ alter: true })
        await Product.sync({ alter: true }).then(() => {
             productImage.sync({ alter: true })
        })
        await Wish.sync({ alter: true })
    })
} catch (err) {
    console.log("DB Connection Failed")
}


app.listen(PORT, () => console.log("Server Running At Port " + PORT))
