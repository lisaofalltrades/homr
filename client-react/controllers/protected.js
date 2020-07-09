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

  User.updateOne({ _id: req.user }, updates, (err, res) => {
    if (err) return res.status(500).send(err)
    console.log('profile updated')
  })
})

// this is what Austen re wrote nothing else changed
router.post('/patientAdd', [authenticate], (req, res) => {
  console.log(req.body)
  Patient.findOne({ firstName: req.body.firstName }, async (err, patientExists) => {
    if (err) return res.status(500).send(err)
    if (patientExists) return res.status(400).send({ errorMessage: 'Patient already exists.' })
    await Patient.register(req.body.photoID, req.body.firstName, req.body.lastName, req.body.dob, req.body.birthPlace, req.body.licenseNum, req.body.race, req.body.medicalHistory, req.body.notes, req.body.redFlags, req.user)

    res.send('post succesfull')
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
        author: req.author._id
      }
    }
  }

  console.log(newNote, 'this is the new note')
  // Note.findOne({ patient: req.body.patient }
  Note.findOne({ _id: req.user }, async (err, patientExists) => {
    if (err) return res.status(500).send(err)
    // if (patientExists) return res.status(201).send({ warning: 'Updating existing note' })
    console.log(author, 'this is line 82')
    // need to add patient it is going to
    await Note.register(req.body.date, req.body.category, req.body.address, req.body.description, req.patient, req.author)

    // await Patient.updateOne({ _id: req.patient }
    await Patient.updateOne({ firstName: 'Austen' }, newNote, (err, res) => {
      if (err) return res.status(500).send(err)
      console.log('notes updated')
    })
    res.send('post succesfull')
  })
})

router.post('/patientSearch', [authenticate], (req, res) => {
  console.log(req.body)
  if (req.body.searchValue) {
    var query = { $or:[{ firstName:{ $regex: req.body.searchValue, $options: 'i' } } ,{ lastName:{ $regex: req.body.searchValue, $options: 'i' } }] }
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
  if (req.body.filter) {
    const filter = req.body.filter
  }
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

module.exports = router
