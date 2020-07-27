// require modules
const funFaker = require('fun-faker')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
// const _ = require('lodash')
const mongoose = require('mongoose')

// Database Name
const dbName = 'homrDB'
const hostname = 'localhost'
// Connection URL
const url = `mongodb://${hostname}/${dbName}`

// require helpers & faker themes
const helpers = funFaker.helpers
const characters = [].concat(funFaker.hp.characters, funFaker.witcher.characters)
const quotes = [].concat(funFaker.hp.quotes, funFaker.office.quotes)
const conditionList = funFaker.medical.conditions
const states = funFaker.states
const categories = ['incident', 'update']

// portland addreses
const portlandAdd = require('./seed/portland.js').addresses

// define # of entries
const numOfUsers = 10
const numOfPatients = 50
const numOfNotes = 100

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.strictEqual(null, err)
  const db = client.db(dbName)
  // get access to the relevant collections
  const usersCollection = db.collection('users')
  const patientsCollection = db.collection('patients')
  const notesCollection = db.collection('notes')
  // clear db
  usersCollection.deleteMany({})
  patientsCollection.deleteMany({})
  notesCollection.deleteMany({})

  /**********************
          USERS
  **********************/
  // list to keep track of duplicates
  const userList = []
  // list of objects to seed db
  const users = []

  for (let i = 0; i < numOfUsers; i += 1) {
    let randomCharacter = helpers.randomItem(characters)
    // check for duplicates
    while (randomCharacter in userList) {
      console.log(randomCharacter + ' already in User list')
      // choose another character
      randomCharacter = helpers.randomItem(characters)
    }
    const fullName = helpers.fullName(randomCharacter)
    const firstName = fullName[0]
    const lastName = fullName[fullName.length - 1]
    const roles = ['fire_chief', 'city_rep', 'charity_rep']
    const role = roles[Math.floor(Math.random() * roles.length)]

    const addressObj = states.helpers.randomAddress()
    console.log(addressObj)
    const city = addressObj.city

    const newUser = {
      email: helpers.userEmail(randomCharacter),
      firstName,
      lastName,
      password: '123',
      role: role,
      district: '',
      city: city,
      status: 'active',
      admin: true
    }
    // for development, everyone gets a district
    const district = (Math.floor(Math.random() * 20) + 1)
    newUser.district = district.toString(8)

    // // add a district if role = fire_chief
    // if (newUser.role === 'fire_chief') {
    //   // assign a district between 1-20
    //   const district = Math.floor(Math.random() * 20)
    //   // converting a number to a string with base 8
    //   newUser.district = district.toString(8)
    // }

    users.push(newUser)
    // console.log(`User#${i} has been added: `, newUser.email)
  }
  console.log('fire chiefs: ', users)
  usersCollection.insertMany(users)

  /**********************
          PATIENTS
  **********************/

  // array to track duplicates
  const patientList = []
  // array of objects to seed db
  const patients = []
  for (let i = 0; i < numOfPatients; i += 1) {
    let randomCharacter = helpers.randomItem(characters)
    // if character already in patients
    while (randomCharacter in patients) {
      console.log(randomCharacter + ' is in patients list')
      // choose another character
      randomCharacter = helpers.randomItem(characters)
    }
    // splitting first & last name into array
    const fullName = helpers.fullName(randomCharacter)
    // add to patientsList array to track duplicates
    patientList.push(randomCharacter)
    var newId2 = new mongoose.mongo.ObjectId()

    const addressObj = states.helpers.randomAddress()
    console.log(addressObj)
    const birthPlace = addressObj.city + ', ' + addressObj.state
    const randomIllness = helpers.randomItem(conditionList
    )

    // current timestamp
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    const newPatient = {
      firstName: fullName[0],
      lastName: fullName[fullName.length - 1],
      birthPlace: birthPlace,
      dob: date,
      medicalHistory: [randomIllness],
      user: newId2
    }
    patients.push(newPatient)
  }
  console.log('PATIENTS', patients)
  patientsCollection.insertMany(patients)

  /**********************
          NOTES
  **********************/

  // array of objects to seed db
  const notes = []

  // loop to add create note objects
  for (let i = 0; i < numOfNotes; i += 1) {
    // current timestamp
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const category = categories[Math.floor(Math.random() * categories.length)]
    const addressObj = states.helpers.randomAddress()
    console.log(addressObj)
    const address = addressObj.fullAddress
    const cords = addressObj.coordinates
    const randomQuote = helpers.randomItem(quotes)

    const newNote = {
      date: date,
      category: category,
      author: users[Math.floor(Math.random() * users.length)],
      patient: patients[Math.floor(Math.random() * patients.length)],
      // author: _.sample(users),
      // patient: _.sample(patients),
      address: address,
      cords: cords,
      description: randomQuote
    }

    notes.push(newNote)
    // console.log(`# Note#${i} has been added`)
    // console.log(newNote)
  }

  // notes loop for portland addresses

  for (let i = 0; i < portlandAdd.length; i += 1) {
    // current timestamp
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    const category = categories[Math.floor(Math.random() * categories.length)]
    const addressObj = portlandAdd[Math.floor(Math.random() * portlandAdd.length)]
    // console.log(addressObj)
    const address = addressObj[0]
    const cords = addressObj[1]
    const randomQuote = helpers.randomItem(quotes)

    const newNote = {
      date: date,
      category: category,
      author: users[Math.floor(Math.random() * users.length)],
      patient: patients[Math.floor(Math.random() * patients.length)],
      address: address,
      cords: cords,
      description: randomQuote
    }

    notes.push(newNote)

    // console.log(`# Note#${i} has been added`)
    // console.log(newNote)
  }
  // console.log(notes)
  // console.log(notes.length)

  // inject DB
  notesCollection.insertMany(notes)

  console.log('*'.repeat(20))
  console.log('\nDatabase seeded! :)\n')
  console.log('*'.repeat(20))

  client.close()
})
