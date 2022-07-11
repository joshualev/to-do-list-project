require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('express-flash')
const mongoDBSession = require('connect-mongodb-session')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')

const sessionsController = require('./controllers/sessions')
const usersController = require('.controllers/users')
const listsController = require('./controllers/lists')

const { MongoDBStore } = require('connect-mongodb-session')


const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const MongoDbStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
    uri: dbURL,
    collection: 'sessions'
})

app.use(cookieParser())
app.use(session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}))
app.use(flash())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use('/', sessionsController)
app.use('/users', usersController)
app.use('/lists', listsController)

mongoose.connect(dbURL, () => {
    console.log('Connected to fruits db')
})

app.listen(PORT, () => {
    console.log('Server started at PORT:', PORT)
})
