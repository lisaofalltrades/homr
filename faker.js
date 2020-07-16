// require modules
const funFaker = require('fun-faker')

// require helpers & faker themes
const helpers = funFaker.helpers
const characters = [].concat(funFaker.hp.characters, funFaker.witcher.characters)
const quotes = [].concat(funFaker.hp.quotes, funFaker.office.quotes)
const conditionList = funFaker.medical.conditions
const states = funFaker.states
const categories = ['incident', 'Update']

// portland addreses
const portlandAdd = require('./seed/portland.js').addresses

// define # of entries
const numOfUsers = 5
const numOfPatients = 10
const numOfNotes = 10

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
    const district = Math.floor(Math.random() * 20)
    newUser.district = district.toString(8)

    users.push(newUser)
    // console.log(`User#${i} has been added: `, newUser.email)
  }

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
    // var newId2 = new mongoose.mongo.ObjectId()

    const addressObj = states.helpers.randomAddress()
    console.log(addressObj)
    const birthPlace = addressObj.city + ', ' + addressObj.state

    const newPatient = {
      firstName: fullName[0],
      lastName: fullName[fullName.length - 1],
      birthPlace: birthPlace,
      medicalHistory: helpers.randomItem(conditionList
      ),
      user: users[Math.floor(Math.random() * users.length)]
    }
    patients.push(newPatient)
  }

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
    console.log('Address Object in notes loop', addressObj)
    const address = addressObj.fullAddress
    const cords = addressObj.coordinates
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
  }

// console.log('*'.repeat(20))
// console.log('\nUsers :)\n')
// for (let i = 0; i < users.length; i += 1) {
//   console.log(users[i])
// }

// console.log('*'.repeat(20))
// console.log('\nPatients :)\n')
// for (let i = 0; i < patients.length; i += 1) {
//   console.log(patients[i])
// }

// console.log('*'.repeat(20))
// console.log('\nNotes :)\n')
// for (let i = 0; i < notes.length; i += 1) {
//   console.log(notes[i])
// }

/* mongo_uri
'mongodb://heroku_906kqvg2:8t1anstopporkf4orjml2qviqo@ds155418.mlab.com:55418/heroku_906kqvg2'

'mongodb://user:pass@host:port/db'

mongo host: port/db -u user -p pass yourSeedFile.js

'mongo ds155418.mlab.com:55418/heroku_906kqvg2 -u user -p pass yourSeedFile.js'

    res.send({
      // token: token,
      admin: user.admin,
      role: user.role,
      email: user.email,
      currentUser: user,
      district: user.district
    })
    console.log('Found author')
    console.log(user)
  })
})
*/