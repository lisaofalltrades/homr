// modules
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const User = require('../models/User')

// server
const express = require('express')
const router = express.Router()

//generate-password
const generator = require('generate-password')

router.post('/signUp', (req, res) => {
  User.findOne({ email: req.body.email }, async (err, userExists) => {
    if (err) return res.status(500).send(err)
    if (userExists) return res.status(400).send({ errorMessage: 'User already exists.' })
    const user = await User.signUp(req.body.email, req.body.password, req.body.role, req.body.admin)

    const token = jwt.sign({
      _id: user._id
    }, 'PROCESS')

    console.log(user, 'on sign up')

    res.send({
      token,
      role: user.role,
      currentUser: user
    })
    res.status(201).send(user.sanitize())
  })
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) return res.status(500).send(err)
    if (!user || !user.comparePassword(req.body.password)) return res.status(400).send({ errorMsg: 'invalid login credentials' })

    const token = jwt.sign({
      _id: user._id
    }, 'PROCESS')

    res.send({
      token: token,
      admin: user.admin,
      role: user.role,
      email: user.email,
      password: user.password,
      currentUser: user
    })
    console.log(user)
    console.log('logged in')
  })
})

router.post('/inviteUsers', (req, res) => {
  req.body.forms.forEach(newUser => {
    User.findOne({ email: newUser }, async (err, userExists) => {
      if (err) return res.status(500).send(err)
      if (userExists) return res.status(400).send({ errorMessage: 'User already exists.' })

      const password = generator.generate({
        length: 8,
        numbers: true
      })
      const role = 'Fireman'
      const admin = false

      const user = await User.signUp(newUser, password, role, admin)

      const token = jwt.sign({
        _id: user._id
      }, 'PROCESS')

      console.log(req.body, 'the is the body')


      console.log(user, 'on sign up')
      // res.send({
      //   token,
      //   role: user.role,
      //   currentUser: user
      // })
      // res.status(201).send(user.sanitize())
    })
  })
})

module.exports = router
