require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('express-flash')

const cookieParser = require('cookie-parser')

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const sessionStore = new MongoDBStore({
    uri: dbURL,
    collection: 'sessions'
})
const listController = require('./controllers/lists')
const userController = require('./controllers/users')
const sessionController = require('./controllers/sessions')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use('/', sessionController)     //localhost:3000/
app.use('/user', userController)    //localhost:3000/user
app.use('/home', listController)     //localhost:3000/home


//connect to MongoDb 'list'
mongoose.connect(dbURL, () => {
    console.log('Connected to list database')
})

//connect to port 3000
app.listen(PORT, () => {
    console.log('Server started at PORT:', PORT)
})
