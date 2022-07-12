const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/users')

const sessionRouter = express.Router()


// localhost:3000/login
sessionRouter.get('/login', (req,res) => {
    res.render('sessions/login.ejs', {
        baseUrl: req.baseUrl,
        currentUser: req.session.currentUser
    })
})

sessionRouter.post('/login', (req,res) => {
    User.findOne({ username: req.body.username })
    .exec()
    .then((user) => {
        if(!user) {
            // user not found
            // success, info, error
            req.flash('error', 'Username or password is incorrect')
            return res.redirect(req.baseUrl + '/login')
        }
        const passwordIsCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!passwordIsCorrect) {
            // user found but password is wrong
            req.flash('error', 'Username or password is incorrect')
            res.redirect(req.baseUrl + '/login')
        } else {
            //user found and password is correct!
            req.session.currentUser = user
            res.redirect('/home')
        }
    })
})

// localhost:3000/logout
sessionRouter.delete('/logout', (req,res) => {
    req.session.destroy(() => {
        res.redirect('/home')
    })
})

module.exports = sessionRouter