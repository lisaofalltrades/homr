// require modules
const funFaker = require('fun-faker')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const _ = require('lodash')
const mongoose = require('mongoose')

// Database Name
const dbName = 'homrDB'
const hostname = 'localhost'
// Connection URL
const url = `mongodb://${hostname}/${dbName}`

// require helpers
const helpers = funFaker.helpers
// require themes
// let characters = funFaker.office.characters
// characters = characters.concat(funFaker.hp.characters, funFaker.witcher.characters)
const characters = [].concat(funFaker.hp.characters, funFaker.witcher.characters)
const conditionList = funFaker.medical.conditions
const states = funFaker.states

// define # of entries
const numOfUsers = 10
const numOfPatients = 20
const numOfNotes = 50

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

  // USERS //
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

    const newUser = {
      email: helpers.userEmail(randomCharacter),
      firstName,
      lastName,
      password: '123'
    }
    users.push(newUser)

    // console.log(`User#${i} has been added: `, newUser.email)
  }
  usersCollection.insertMany(users)

  // PATIENTS //
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

    const newPatient = {
      firstName: fullName[0],
      lastName: fullName[fullName.length - 1],
      // birthPlace: states.helpers.randomZip(),
      medicalHistory: helpers.randomItem(conditionList
      ),
      user: newId2
    }
    patients.push(newPatient)

    // console.log(`# Patient#${i} has been added`)
    // console.log(newPatient)
  }
  patientsCollection.insertMany(patients)

  // NOTES
  // array of objects to seed db
  const notes = []

  // loop to add create note objects

  for (let i = 0; i < numOfNotes; i += 1) {
    // current timestamp
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    // random note category
    const categories = ['Incident', 'Update']
    const category = categories[Math.floor(Math.random() * categories.length)]

    const newNote = {
      date: date,
      category: category,
      author: _.sample(users),
      patient: _.sample(patients),
      address: states.helpers.randomAddress()[0]
    }

    notes.push(newNote)

    // console.log(`# Note#${i} has been added`)
    // console.log(newNote)
  }
  // inject DB
  notesCollection.insertMany(notes)

  console.log('*'.repeat(20))
  console.log('\nDatabase seeded! :)\n')
  console.log('*'.repeat(20))
  client.close()
})
