// function fakeUsers () {
//   // define characters to choose from
//   const characters = funFaker.office.characters
//   const userList = []

//   // loop
//   for (let i = 0; i < numOfUsers; i++) {
//     // choose a random fake user
//     let newUser = helpers.randomItem(characters)

//     // check for duplicate user
//     while (newUser in userList) {
//       console.log(newUser + ' already in User list')
//       // choose another character
//       newUser = helpers.randomItem(characters)
//     }

//     userList.push(newUser)

//     // first & last name
//     const fullName = helpers.fullName(newUser)
//     const firstName = fullName[0]
//     const lastName = fullName[fullName.length - 1]

//     const username = helpers.userEmail(newUser)
//     const password = '123'

//     const roles = ['Fire Chief', 'City Representative', 'Charity Representative']
//     const role = roles[Math.floor(Math.random() * roles.length)]

//     const admin = true
//     const address = states.helpers.randomAddress()

//     console.log('\nUser ', (i + 1))
//     console.log(username)
//     console.log('First Name: ', firstName)
//     console.log('Last Name: ', lastName)
//     console.log('Role: ', role)
//     console.log('Admin:', admin)
//     console.log('Address: ', address)
//   }
// }

// function fakePatients () {
//   const patients = []

//   // new patients
//   for (let i = 0; i < numOfPatients; i++) {
//     // choose a random character
//     let randomCharacter = helpers.randomItem(characters)

//     // if character already in patients
//     while (randomCharacter in patients) {
//       console.log(randomCharacter + ' is in patients list')
//       // choose another character
//       randomCharacter = helpers.randomItem(characters)
//     }

//     patients.push(randomCharacter)

//     // first & last name
//     const fullName = helpers.fullName(randomCharacter)
//     const firstName = fullName[0]
//     const lastName = fullName[fullName.length - 1]

//     // random zip
//     const zip = states.helpers.randomZip()

//     // random illness
//     const illness = helpers.randomItem(conditionList
//     )

//     console.log('\nPatient ', (i + 1))
//     console.log(fullName)
//     console.log('First Name: ', firstName)
//     console.log('Last Name: ', lastName)
//     console.log('birth place: ', zip)
//     console.log('Illness: ', illness)
//   }

//   // fetch('/patientAdd', {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //     // how do I fake a token?
//   //     Authorization: `Bearer ${this.state.token}`
//   //   },
//   //   body: JSON.stringify({
//   //     photoID: null,
//   //     firstName: firstName,
//   //     lastName: lastName,
//   //     dob: this.state.basicInfo.dob,
//   //     birthPlace: zip,
//   //     licenseNum: this.state.basicInfo.licenseNum,
//   //     race: this.state.basicInfo.race,
//   //     medicalHistory: illness,
//   //     notes: null,
//   //     redFlags: null
//   //   })
//   // })
//   //   .then(response => response.json())
// }

// function fakeNotes () {
//   for (let i = 0; i < numOfNotes; i++) {
//     // random user & random author
//     const author = Math.floor(Math.random() * numOfUsers) + 1
//     const patientId = Math.floor(Math.random() * numOfPatients) + 1

//     // current timestamp
//     const today = new Date()
//     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

//     // random note category
//     const categories = ['Incident', 'Update']
//     const category = categories[Math.floor(Math.random() * categories.length)]

//     const address = states.helpers.randomAddress()

//     console.log('\nNote entry# ', (i + 1))
//     console.log('date: ', date)
//     console.log('author: ', author)
//     console.log('patient_id: ', patientId)
//     console.log('Note Category: ', category)
//     console.log('address: ', address)
//   }

//   // fetch('/AddNote', {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //     // how do I fake a token?
//   //     Authorization: `Bearer ${this.state.token}`
//   //   },
//   //   body: JSON.stringify({
//   //     date: date,
//   //     firstName: firstName,
//   //     lastName: lastName,
//   //     dob: this.state.basicInfo.dob,
//   //     birthPlace: zip,
//   //     licenseNum: this.state.basicInfo.licenseNum,
//   //     race: this.state.basicInfo.race,
//   //     medicalHistory: illness,
//   //     notes: null,
//   //     redFlags: null
//   //   })
//   // })
//   //   .then(response => response.json())
//   // }
// }