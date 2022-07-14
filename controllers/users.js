const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/users')

const userRouter = express.Router()

// localhost:3000/users/signup
userRouter.get('/signup', (req,res) => {
    res.render('users/signup.ejs', {
        currentUser: req.session.currentUser,
        baseUrl: req.baseUrl,
    })
})

//Create user AND overwrite users pw with hashed pw and pass to db
userRouter.post('/', (req,res) => {
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync())
User.create(req.body)
.then((user) => {
    console.log('created user: ', user )
    res.redirect('/home')
   
})
.catch(() => {
    req.flash('info', 'Username already exists')
    res.redirect(req.baseUrl + '/signup')
    })
})

module.exports = userRouter