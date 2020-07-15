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
const quotes = [].concat(funFaker.hp.quotes, funFaker.office.quotes)
const conditionList = funFaker.medical.conditions
const states = funFaker.states
const categories = ['Incident', 'Update']

// Portland Addresses
const portlandAdd = [
  [
    '3504 SE 92nd Ave, Portland, OR 97266',
    { lat: 45.496590, long: -122.566570 }
  ],
  [
    '16211 SE Division St, Portland, OR 97236',
    { lat: 45.504930, long: -122.496120 }
  ],
  [
    '3432 SE 25th Ave, Portland, OR 97202',
    { lat: 45.498470, long: -122.640320 }
  ],
  [
    '4229 NE 122nd Ave, Portland, OR 97230',
    { lat: 45.552910, long: -122.537260 }
  ],
  [
    '2975 NE Hogan Dr, Gresham, OR 97030',
    { lat: 45.518390, long: -122.412950 }
  ],
  [
    '1135 NE Martin Luther King Jr Blvd, Portland, OR 97232',
    { lat: 45.5311136, long: -122.6620034 }
  ],
  [
    '1122 SE Hawthorne Blvd, Portland, OR 97214',
    { lat: 45.5120579, long: -122.6539873 }
  ],
  [
    '8218 NE Glisan St, Portland, OR 97220',
    { lat: 45.518390, long: -122.412950 }
  ],
  [
    '4200 SE 82nd Ave, Portland, OR 97266',
    { lat: 45.5261283, long: -122.5786043 }
  ],
  [
    '3527 SE 122nd Ave, Portland, OR 97236',
    { lat: 45.4962466, long: -122.5391627 }
  ]
]

// define # of entries
const numOfUsers = 5
const numOfPatients = 10
const numOfNotes = 15

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
    const roles = ['fire_chief', 'city_rep', 'charity_rep']
    const role = roles[Math.floor(Math.random() * roles.length)]
    const address = states.helpers.randomAddress()[0]
<<<<<<< HEAD
    // const zip = address[1].match(/\d+/)[0]

=======
>>>>>>> bc6f13139327a8434be3ff090be0870d0056fda6
    const newUser = {
      email: helpers.userEmail(randomCharacter),
      firstName,
      lastName,
      password: '123',
      role: role,
      district: Math.floor(Math.random() * 20) // 20 districts
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
<<<<<<< HEAD

=======
    // random note category
    const categories = ['Incident', 'Update']
>>>>>>> bc6f13139327a8434be3ff090be0870d0056fda6
    const category = categories[Math.floor(Math.random() * categories.length)]
    const addressObj = states.helpers.randomAddress()
    console.log(addressObj)
    const address = addressObj[0]
    const cords = addressObj[1]
<<<<<<< HEAD
    const randomQuote = helpers.randomItem(quotes)

=======
>>>>>>> bc6f13139327a8434be3ff090be0870d0056fda6
    const newNote = {
      date: date,
      category: category,
      author: _.sample(users),
      patient: _.sample(patients),
      address: address,
<<<<<<< HEAD
      cords: cords,
      description: randomQuote
=======
      cords: cords
>>>>>>> bc6f13139327a8434be3ff090be0870d0056fda6
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
    console.log(addressObj)
    const address = addressObj[0]
    const cords = addressObj[1]
    const randomQuote = helpers.randomItem(quotes)

    const newNote = {
      date: date,
      category: category,
      author: _.sample(users),
      patient: _.sample(patients),
      address: address,
      cords: cords,
      description: randomQuote
    }

    notes.push(newNote)

    // console.log(`# Note#${i} has been added`)
    // console.log(newNote)
  }
  console.log(notes)
  console.log(notes.length)
  // inject DB
  notesCollection.insertMany(notes)
  console.log('*'.repeat(20))
  console.log('\nDatabase seeded! :)\n')
  console.log('*'.repeat(20))
  client.close()
})