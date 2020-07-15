const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const noteSchema = Schema({
  date: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  patient: {
    type: ObjectId,
    required: false,
    ref: 'Patient'
    // this is the user that is logged in and not the user? why?
  },
  author: {
    type: ObjectId,
    required: false,
    ref: 'User'
  },
  cords: {
    type: String,
    required: false
  }
})

noteSchema.statics.register = async function (date, category, address, description, patient, author, cords) {
  const note = new this()
  note.date = date
  note.category = category
  note.address = address
  note.description = description
  note.patient = patient
  note.author = author
  note.cords = cords

  await note.save()

  return note
}

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
