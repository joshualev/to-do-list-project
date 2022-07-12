require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const mongoDBSession = require('connect-mongodb-session')

const listController = require('./controllers/lists')
const userController = require('./controllers/users')
const sessionController = require('./controllers/sessions')

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
    uri: dbURL,
    collection: 'sessions'
})

app.use(cookieParser('secretstringforcookies'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}))
app.use(flash())
app.use(express.urlencoded({ extended: true }))
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
