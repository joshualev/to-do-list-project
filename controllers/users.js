const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/users')

const userRouter = express.Router()

// localhost:3000/users/signup
//GET   /signup
userRouter.get('/signup', (req,res) => {
    res.render('users/signup.ejs', {
        currentUser: req.session.currentUser,
        baseUrl: req.baseUrl,
    })
})


//POST  /
userRouter.post('/', (req,res) => {
    //Create user AND overwrite users pw with hashed pw and pass to db
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync())
User.create(req.body)
.then((user) => {
    // req.flash('success', 'Account created! Try signing in')
    console.log('created user: ', user )
    res.redirect('/list')
   
})
.catch(() => {
    req.flash('info', 'Username already exists')
    res.redirect(req.baseUrl + '/signup')
    })
})

module.exports = userRouter