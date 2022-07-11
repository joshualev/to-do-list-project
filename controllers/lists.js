const express = require('express')
const router = express.Router()

const List = require('../models/lists')

router.get('', (req,res) => {
    List.find(req.body)
    .exec()
    .then((lists) => {
        res.render('index.ejs', {
            lists: lists
        })
    })
    .catch((err) => {
        console.log("error detected: ", err)
    })
})

router.get('/:id', (req,res) => {
    List.findById(req.params.id)
    .exec()
    .then((list) => {
        res.render('show.ejs', {
            list: list
        })
    })
    .catch((err) => {
        console.log("error detected", err)
    })
})

//index GET /
// router.get('/', (req,res) => {
//         List.insertMany(listItems)
//         .then((lists) => {
//             res.send(lists)
//             console.log(lists)
//         })
//     })


console.log(List.find())


module.exports = router