const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        priority: { type: String, default: "medium"},
        status: { type: Boolean, default: false},
        dateMade: { type: Date },
        dateDue: { type: Date },
    },
    { timestamps: true }
)

const List = mongoose.model('List', listSchema)

module.exports = List