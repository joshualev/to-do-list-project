const express = require('express')
const router = express.Router()

const List = require('../models/lists')


const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/login')
    }
  }
router.use(isAuthenticated)




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


//GET   /categories
router.get('/completed', (req,res) => {
    List.find()
    .then((list) => {
        console.log(list)
        res.render('category/completed.ejs', {
            currentUser: req.session.currentUser,
            baseUrl: req.baseUrl,
            list : list
        })
    })
    .catch((err) => {
        console.log('error detected on GET category: ', err)
    })
})
router.get('/education', (req,res) => {
    List.find()
    .then((list) => {
        console.log(list)
        res.render('category/education.ejs', {
            currentUser: req.session.currentUser,
            baseUrl: req.baseUrl,
            list : list
        })
    })
    .catch((err) => {
        console.log('error detected on GET category: ', err)
    })
})
router.get('/personal', (req,res) => {
    List.find()
    .then((list) => {
        console.log(list)
        res.render('category/personal.ejs', {
            currentUser: req.session.currentUser,
            baseUrl: req.baseUrl,
            list : list
        })
    })
    .catch((err) => {
        console.log('error detected on GET category: ', err)
    })
})
router.get('/social', (req,res) => {
    List.find()
    .then((list) => {
        console.log(list)
        res.render('category/social.ejs', {
            currentUser: req.session.currentUser,
            baseUrl: req.baseUrl,
            list : list
        })
    })
    .catch((err) => {
        console.log('error detected on GET category: ', err)
    })
})
router.get('/work', (req,res) => {
    List.find()
    .then((list) => {
        console.log(list)
        res.render('category/work.ejs', {
            currentUser: req.session.currentUser,
            baseUrl: req.baseUrl,
            list : list
        })
    })
    .catch((err) => {
        console.log('error detected on GET category: ', err)
    })
})


router.get('/new', (req,res) => {
    res.render('new.ejs', {
        baseUrl: req.baseUrl,
        currentUser: req.session.currentUser
    })
})

//POST  /
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

//PUT   /
router.put('/', (req,res) => {
    List.findByIdAndUpdate(req.params.id, req.body, { new: true } ) 
    .exec()
    .then((list) => {
        console.log('list-item updated as complete: ', list)
        res.redirect(req.baseUrl)
    })
})


//DELETE    /:id
router.delete('/completed', (req,res) => {
    List.findOneAndDelete(req.params.id)
    .exec()
    .then((list) => {
        console.log('removed the list item: ', list)
        res.redirect('/completed')
    })
    .catch((err) => {
        console.log('error detected at ', err)
    })
})

//GET   /:id
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


//DELETE    /:id
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
router.put('/:id',  (req,res) => {
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
        console.log(list.category)
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