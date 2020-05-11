const mongoose = require('mongoose')

var ChatSchema = new mongoose.Schema({
  name: String
})

module.exports = mongoose.model("Chat", ChatSchema)
