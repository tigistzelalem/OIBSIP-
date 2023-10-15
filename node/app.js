const express = require('express')
const app = express()
const cors = require('cors')
const userRoute = require('./routes/user_route')
const pizzaRoute = require('./routes/pizza_route')
const adminRoute = require('./routes/admin_route')
const authMiddleware = require('./middleware/auth')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/node-backend", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5000);
        console.log('connected')
    })
    .catch((error) => {
        console.log(error)
    })
app.use('/users', userRoute)
app.use(authMiddleware.authentication)
app.use('/pizza', authMiddleware.authentication, pizzaRoute)
app.use('/admin', authMiddleware.authentication, adminRoute)




