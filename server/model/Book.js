const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    title: {type: String, required: true},
    ISBN: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    published_date: {type: Date, required: true},
    publisher: {type: String, required: true},
    user: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Book = mongoose.model('BOOK', bookSchema);

module.exports = Book;