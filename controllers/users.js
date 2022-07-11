const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/users')

const users = express.Router()

users.get('/signup', (req,res) => {
    res.render('users/signup.ejs', {
        baseUrl: req.baseUrl
    })
})

users.post('/', (req,res) => {
    // overwrite user password with hashed password to be used in our database
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
    )
    User.create(req.body)
    .then((newUser) => {
        console.log('New used is ', newUser)
        res.redirect('/') //redirect to app homepage
    })
})

module.exports = users