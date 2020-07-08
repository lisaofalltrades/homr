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
  },
  author: {
    type: ObjectId,
    required: false,
    ref: 'User'
  }
})

noteSchema.statics.register = async function (date, category, address, description, patient, author) {
  const note = new this()
  note.date = date
  note.category = category
  note.address = address
  note.description = description
  note.patient = patient
  note.author = author

  await note.save()

  return note
}

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
