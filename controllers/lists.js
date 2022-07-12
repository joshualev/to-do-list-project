const express = require('express')
const router = express.Router()

const List = require('../models/lists')

//if user is logged in proceed, else redirect to login page
const isLoggedIn = (req,res,next) => {
    if(!req.session.currentUser) {
        return res.redirect('/login')
    }
    next()
}

router.use(isLoggedIn)




router.get('/', (req,res) => {
    List.find()
    .exec()
    .then((lists) => {
        res.render('index.ejs', {
            currentUser: req.session.currentUser,
            baseUrl: req.baseUrl,
            lists: lists
        })
    })
    .catch((err) => {
        console.log("error detected: ", err)
    })
})






router.get('/new', (req,res) => {
    res.render('new.ejs', {
        baseUrl: req.baseUrl,
        currentUser: req.session.currentUser
    })
})


router.post('/', (req,res) => {
    if (req.body.status === 'on'){
        req.body.status = true
    } else {
        req.body.status = false
    }
    List.create(req.body)
    .then((list) => {
        console.log('created list item: ', list)
        res.redirect(req.baseUrl)
    })
    .catch((err) => {
        console.log("error detected during post request to route '/':", err)
    })
})



router.get('/:id', (req,res) => {
    List.findById(req.params.id)
    .exec()
    .then((list) => {
        res.render('show.ejs', {
            baseUrl: req.baseUrl,
            list: list,
            currentUser: req.session.currentUser
        })
    })
    .catch((err) => {
        console.log("error detected", err)
    })
})



router.delete('/:id', (req,res) => {
    List.findOneAndDelete(req.params.id)
    .exec()
    .then((list) => {
        console.log('removed the list item: ', list)
        res.redirect(req.baseUrl)
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
    .then((list) => {
        console.log('list updated to: ', list)
        res.redirect(req.baseUrl)
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
            currentUser: req.session.currentUser,
            baseUrl: req.baseUrl,
            list: list
        })
    })
    .catch((err) => {
        console.log("error detected", err)
    })
})



module.exports = router