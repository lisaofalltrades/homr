const funFaker = require('fun-faker')

function fakeData () {
  // define list of characters
  let characters = funFaker.office.characters
  characters = characters.concat(funFaker.hp.characters, funFaker.witcher.characters)

  // define list of places
  const conditionList = funFaker.medical.conditions

  for (let i = 0; i < 100; i++) {
    // choose a random character
    const randomCharacter = funFaker.randomItem(characters)

    // get first name
    const firstName = randomCharacter.split(' ')[0]

    // get last name
    let lastName = randomCharacter.split(' ')[1]

    if (randomCharacter.split(' ')[1] === null) {
      lastName = 'Unknown'
    }

    // random illness
    const illness = funFaker.randomItem(conditionList
    )
    // console.log('\nPatient ', (i + 1))
    // console.log('First Name: ', firstName)
    // console.log('Last Name: ', lastName)
    // console.log('Illness: ', illness)
  }

  // fetch('/patientAdd', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // how do I fake a token?
  //     Authorization: `Bearer ${this.state.token}`
  //   },
  //   body: JSON.stringify({
  //     photoID: this.state.basicInfo.photoID,
  //     firstName: this.state.basicInfo.firstName,
  //     lastName: this.state.basicInfo.lastName,
  //     dob: this.state.basicInfo.dob,
  //     birthPlace: this.state.basicInfo.birthPlace,
  //     licenseNum: this.state.basicInfo.licenseNum,
  //     race: this.state.basicInfo.race,
  //     medicalHistory: this.state.medicalHistory,
  //     notes: null,
  //     redFlags: null
  //   })
  // })
  //   .then(response => response.json())
}

module.exports = {
  faker: fakeData()
}
