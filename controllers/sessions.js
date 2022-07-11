const express = require('express')
const bcrypt = require('bcrypt')

const sessionRouter = express.Router()

req.flash('error', 'Incorrect username or password')
res.redirect(req.baseUrl + '/login')