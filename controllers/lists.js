const express = require('express')
const router = express.Router()

const List = require('../models/lists')


//GET   /
router.get('/', (req,res) => {
    List.find(req.body)
    .exec()
    .then((lists) => {
        console.log(lists[3])
        res.render('index.ejs', {
            lists: lists
        })
    })
    .catch((err) => {
        console.log("error detected: ", err)
    })
})

//GET   /new
router.get('/new', (req,res) => {
    List.find(req.body)
        res.render('new.ejs')
})


//POST    /
router.post('/', (req,res) => {
    List.create(req.body)
    .then((list) => {
        console.log(list)
        res.redirect('/')
    })
    .catch((err) => {
        console.log("error detected during post request to route '/':", err)
    })
})

//GET   /:id
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

//DELETE
router.delete('/:id', (req,res) => {
    List.findOneAndDelete(req.params.id)
    .exec()
    .then((list) => {
        console.log('removed the list item: ', list)
        res.redirect('/')
    })
    .catch((err) => {
        console.log('error detected at ', err)
    })
})


//PUT   /:id
router.put('/:id', (req,res) => {
    if (req.body.status === 'on'){
        req.body.status = true
    } else {
        req.body.status = false
    }
    List.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then((updatedList) => {
        console.log('list updated to: ', updatedList)
        res.redirect('/')
    })
    .catch((err) => {
        console.log("error detected", err)
    })
})


//GET   /:id/edit
router.get('/:id/edit', (req,res) => {
    List.findById(req.params.id)
    .exec()
    .then((list) => {
        res.render('edit.ejs', {
            list: list
        })
    })
    .catch((err) => {
        console.log("error detected", err)
    })
})



module.exports = router