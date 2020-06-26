// modules
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// server
const express = require('express')
const router = express.Router()

router.post('/signUp', (req, res) => {
  User.findOne({ email: req.body.email }, async (err, userExists) => {
    if (err) return res.status(500).send(err)
    if (userExists) return res.status(400).send({ errorMessage: 'User already exists.' })
    const user = await User.signUp(req.body.email, req.body.password, req.body.role, req.body.admin)
    res.status(201).send(user.sanitize())
  })
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) return res.status(500).send(err)
    if (!user || !user.comparePassword(req.body.password)) return res.status(400).send({ errorMsg: 'invalid login credentials' })
    console.log('logged in')
  })
})

module.exports = router