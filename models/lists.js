const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        priority: { type: String, required: true},
        status: { type: Boolean, default: false},
        dateDue: {type: Date},
        category: { type: String, required: true },
    },
    { timestamps: true }
)


const List = mongoose.model('List', listSchema)


module.exports = List


