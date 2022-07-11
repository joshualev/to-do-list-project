const express = require('express')

const listRouter = express.Router()

const List = require('../models/lists')

const listItems = [
    {
        title: 'Do shopping',
        description: 'buy groceries, need milk and tea'
    },
    {
        title: 'wash dogs',
        description: 'wash dogs, trim nails, buy new dog collars'
    },
    
    {
        title: 'go to the gym',
        description: 'train 60 minutes of resistance exercise (fullbody)'
    }
]

//index GET /
listRouter.get('/', (req,res) => {
        List.insertMany(listItems)
        .then((lists) => {
            res.send(lists)
            console.log(lists)
        })
    })



module.exports = listRouter