const express = require('express')

const methodOverride = require('method-override')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(methodOverride('_method'))


app.listen(PORT, () => {
    console.log('Server started at PORT:', PORT)
})
