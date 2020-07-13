const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const patientSchema = Schema({
  date: {
    type: Date,
    required: false
  },
  photoID: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  dob: {
    type: String,
    required: false
  },
  birthPlace: {
    type: String,
    required: false
  },
  licenseNum: {
    type: String,
    required: false
  },
  race: {
    type: String,
    required: false
  },
  notes: {
    type: Array,
    required: false
  },
  medicalHistory: {
    type: Array,
    required: false
  },
  redFlags: {
    type: Array,
    required: false
  },
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  }
})

patientSchema.statics.register = async function (photoID, firstName, lastName, dob, birthPlace, licenseNum, race, medicalHistory, notes, redFlags, user) {
  const patient = new this()
  patient.date = new Date()
  patient.photoID = photoID
  patient.firstName = firstName
  patient.lastName = lastName
  patient.dob = dob
  patient.birthPlace = birthPlace
  patient.licenseNum = licenseNum
  patient.race = race
  patient.medicalHistory = medicalHistory
  patient.notes = notes
  patient.redFlags = redFlags
  patient.user = user

  await patient.save()

  return patient
}

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
