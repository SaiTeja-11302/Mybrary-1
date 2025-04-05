const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

authorSchema.pre('deleteOne', { document: true, query: false }, async function() {
  const books = await Book.find({ author: this._id })
  if (books.length > 0) {
    throw new Error('Cannot delete author with existing books')
  }
})

module.exports = mongoose.model('Author', authorSchema)