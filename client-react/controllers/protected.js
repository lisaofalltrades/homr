// modules
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// server
const express = require('express')
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


// UPDATE THIS Tuesday
router.post('/profileUpdate', [authenticate], (req, res) => {
  console.log(req.user)
  const userInfo = User.updateOne({ _id: req.user }, async (err, user) => {
    if (err) return res.status(500).send(err)

    await User.profileUpdate(req.body.Fname, req.body.Lname, req.body.job_title, req.body.city, req.body.county, req.body.district)


  console.log('profile update')
  // })
})

module.exports = router

