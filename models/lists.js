const mongoose = require('mongoose')

const Schema = mongoose.Schema

const listSchema = new Schema(
    {
    },
    { timestamps: true }
)

const List = mongoose.model('List', listSchema)

module.exports = List