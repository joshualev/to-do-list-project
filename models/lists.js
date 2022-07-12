const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        priority: { type: String, required: true},
        status: { type: Boolean, default: false},
        dateDue: { type: Date },
    },
    { timestamps: true }
)

// const categorySchema = new Schema({
//     name: String,
//     listItem: { 
//         type: Schema.Types.ObjectId,
//         ref: 'List'
//     }
// })

const List = mongoose.model('List', listSchema)
// const Category = mongoose.model('Category', categorySchema)

//find all objects in list and populate Category db with list 'category' data
// mongoose.connect(dbURL, async () => {
//     List
//     .find()
//     .populate('category')
//     .then(console.log)
// })



module.exports = List


// List = {
//     title: '',
//     description: '',
//     priority: '',
//     status: '',
//     dateDue:  ''.
// }

// Category = {
//     name: '',
//     listItems: '',
// }