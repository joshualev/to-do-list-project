const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/users')

const userRouter = express.Router()

//GET   /signup
// localhost:3000/users/signup
userRouter.get('/signup', (req,res) => {
    res.render('users/signup.ejs', {
        baseUrl: req.baseUrl,
        currentUser: req.session.currentUser
    })
})


//Create user AND
//Overwrite users pw with hashed pw and pass to db
userRouter.post('/', (req,res) => {
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync())
User.create(req.body)
.then((user) => {
    console.log('created user: ', user )
    res.redirect('/home')
})
.catch((err) => {
    req.flash('info', 'Username already exists')
    res.redirect(req.baseUrl + '/signup')
    console.log("error: ", err)
    })
})


module.exports = userRouter