// modules
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Patient = require('../models/Patient')
const Note = require('../models/Note')
// server
const express = require('express')
const { Profiler } = require('react')
const { db } = require('../models/User')
// const { default: Notes } = require('../src/patientInfo/Notes')
const router = express.Router()

// provides a short authenticate to other get routes
const authenticate = (req, res, next) => {
  const authorization = req.header('Authorization') || ''
  const [type, token] = authorization.split(' ')
  try {
    if (type === 'Bearer' && jwt.verify(token, 'PROCESS')) { // change for depoyment
      console.log(token, 'token')
      const payload = jwt.decode(token, 'PROCESS')
      console.log(payload, 'payload')
      User.findOne({ _id: payload._id }, (err, userDoc) => { // change for deployment
        if (err) return res.status(500).send(err)
        req.user = userDoc
        req.author = userDoc
        console.log('authenticate ran')
        return next()
      })
    } else {
      console.log('this is the else')
      res.status(401).send('Unauthorized')
    }
  } catch (err) {
    console.log(err, 'this is the catch')
    res.status(401).send('Unauthorized')
  }
}

router.post('/profileUpdate', [authenticate], (req, res) => {
  console.log(req.user)

  const objUpdate = {}
  console.log(req.body, 'req.body is')

  if (req.body.Fname !== '') objUpdate.first_name = req.body.Fname
  if (req.body.Lname !== '') objUpdate.last_name = req.body.Lname
  if (req.body.job_title !== '') objUpdate.job_title = req.body.job_title
  if (req.body.city !== '') objUpdate.city = req.body.city
  if (req.body.county !== '') objUpdate.county = req.body.county
  if (req.body.district !== '') objUpdate.district = req.body.district

  console.log(objUpdate)
  const updates = {
    $set: objUpdate
  }

  User.updateOne({ _id: req.user }, updates, (err, user) => {
    if (err) return res.status(500).send(err)
    console.log('profile updated')
    User.findOne({ _id: req.user._id }, (err, newuser) => {
      if (err) return res.status(500).send(err)
      res.send(newuser)
    })
  })
})

router.post('/patientAdd', [authenticate], (req, res) => {
  console.log(req.body, 'line 68')
  Patient.findOne({ firstName: req.body.firstName, lastName: req.body.lastName, dob: req.body.dob }, async (err, patientExists) => {
    if (err) return res.status(500).send(err)
    if (patientExists) return res.status(400).send({ errorMessage: 'Patient already exists.' })
    await Patient.register(req.body.photoID, req.body.firstName, req.body.lastName, req.body.dob, req.body.birthPlace, req.body.licenseNum, req.body.race, req.body.medicalHistory, req.body.notes, req.body.redFlags, req.user)
    
    res.send('post succesfull')
  })
})

router.post('/patientLookup', [authenticate], (req, res) => {
  Patient.find({ _id: req.body.patientID }, async (err, data) => {
    if (err) return res.status(500).send(err)
    if (data) {
      res.send({
        data
      })
    } else {
      res.send(console.log('No results found'))
    }
  })
})

router.post('/patientEdit', [authenticate], (req, res) => {
  const objUpdate = {}
  console.log(req.body, 'req.body is')
  if (req.body.firstName !== '') objUpdate.firstName = req.body.firstName
  if (req.body.lastName !== '') objUpdate.lastName = req.body.lastName
  if (req.body.dob !== '') objUpdate.dob = req.body.dob
  if (req.body.birthPlace !== '') objUpdate.birthPlace = req.body.birthPlace
  if (req.body.licenseNum !== '') objUpdate.licenseNum = req.body.licenseNum
  if (req.body.race !== '') objUpdate.race = req.body.race
  objUpdate.date = new Date()
  let medicalHistory = []
  if (req.body.medicalHistory !== []) medicalHistory = req.body.medicalHistory
  console.log(objUpdate)
  const updates = {
    $set: objUpdate,
    $push: {
      medicalHistory: medicalHistory
    }
  }
  Patient.updateOne({ _id: req.body.patientID }, updates, (err, user) => {
    if (err) return res.status(500).send(err)
    console.log('profile updated')
    Patient.findOne({ _id: req.body.patientID }, (err, patientUpdate) => {
      if (err) return res.status(500).send(err)
      console.log(patientUpdate)
      // res.send(patientUpdate)
    })
  })
})

router.post('/AddNote', [authenticate], (req, res) => {
  console.log(req.body, 'add note console log')
  console.log(req.author, 'author')
  const author = req.author

  const newNote = {
    $push: {
      notes: {
        date: req.body.date,
        category: req.body.category,
        address: req.body.address,
        description: req.body.description,
        author: req.author._id,
        cords: req.body.cords
      }
    },
    $set: {
      date: new Date(),
      redFlags: req.body.redFlags
    }
  }

  console.log(newNote, 'this is the new note')
  // Note.findOne({ patient: req.body.patient }
  async function Notes () {
    // if (err) return res.status(500).send(err)
    // if (patientExists) return res.status(201).send({ warning: 'Updating existing note' })
    console.log(req.body.cords, 'cords')
    await Note.register(req.body.date, req.body.category, req.body.address, req.body.description, req.patient, req.author, req.body.cords)

    // await Patient.updateOne({ _id: req.patient }
    Patient.updateOne({ _id: req.body.patient }, newNote, (err, patient) => {
      if (err) return res.status(500).send(err)
      // res.send('post succesfull')
      Patient.findOne({ _id: req.body.patient }, (err, patient) => {
        if (err) return res.status(500).send(err)
        // res.send('post succesfull')
        console.log(patient, 'this is the patients data')
        res.send(patient)
      })
    })
  }
  Notes()
})

router.post('/patientSearch', [authenticate], (req, res) => {
  console.log(req.body)
  if (req.body.searchValue) {
    var query = { $or: [{ firstName: { $regex: req.body.searchValue, $options: 'i' } }, { lastName: { $regex: req.body.searchValue, $options: 'i' } }] }
  }

  Patient.find(query, async (err, data) => {
    if (err) return res.status(500).send(err)
    if (data) {
      res.send({
        data
      })
    } else {
      res.send(console.log('No results found'))
    }
  })
})

router.post('/allPatients', [authenticate], (req, res) => {
  Patient.find({}, async (err, data) => {
    if (err) return res.status(500).send(err)
    if (data) {
      res.send({
        data
      })
    } else {
      res.send(console.log('No results found'))
    }
  })
})

router.post('/noteLocations', [authenticate], (req, res) => {
  Note.find((err, data) => {
    if (err) return res.status(500).send(err)
    console.log(data, 'this is the map data')
    res.send(data)
  })
})
router.post('/notes', [authenticate], (req, res) => {
  // query all notes where category = incident
  Note.find({ category: 'incident' }, async (err, data) => {
    if (err) return res.status(500).send(err)
    if (data) {
      res.send({
        data
      })
    } else {
      res.send(console.log('No results found'))
    }
  })
})

module.exports = router
