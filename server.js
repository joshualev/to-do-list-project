const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const listRouter = require('./controllers/lists')

const PORT = 3000
const dbURL = "mongodb://localhost:27017/list" 

const app = express()
const List = require('./models/lists')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

//set '/' as default on listRouter
app.use('/', listRouter)

//connect to MongoDb 'list'
mongoose.connect(dbURL, () => {
    console.log('mongoose connected to:', dbURL)
})

//connect to port 3000
app.listen(PORT, () => {
    console.log('Server started at PORT:', PORT)
})
