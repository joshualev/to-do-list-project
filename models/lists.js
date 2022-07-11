const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        status: {type: Boolean, required: true, default: false},
    },
    { timestamps: true }
)

const List = mongoose.model('List', listSchema)

module.exports = List