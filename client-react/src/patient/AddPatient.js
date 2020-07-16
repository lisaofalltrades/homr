import React from 'react'
import { Header, Button, Form, Dropdown } from 'semantic-ui-react'

const illnessList = [
  'alcoholism',
  'allergies',
  'alzheimer\'s',
  'amputation',
  'angioplasty/cabg',
  'aortic aneurysm',
  'appendicitis',
  'arthritis',
  'asthma',
  'atrial fibrillation',
  'autism',
  'bronchitis',
  'cancer',
  'cardiac',
  'CVA/TIA',
  'chronic back pain',
  'congestive heart failure',
  'COPD/emphysema',
  'coronary artery disease',
  'covid-19 (confirmed)',
  'dementia',
  'diabetes 1',
  'diabetes 2',
  'diverticulitis',
  'epiglottitis',
  'fall risk',
  'gastrointestinal disease',
  'gerd',
  'glaucoma',
  'hearing impaired',
  'hepatitis',
  'hernia',
  'HIV/aids',
  'hypertension',
  'implanted defibrillator',
  'liver disease',
  'meningitis',
  'migraines',
  'miocardio imfaction',
  'obesity',
  'osteoporosis',
  'Other',
  'pacemaker',
  'placenta abruptio placenta before the baby',
  'placenta previa',
  'pneumonia',
  'preeclampsia',
  'pregnancy',
  'prescribed medications',
  'psychiatric',
  'pulmonary embolism',
  'renal failure',
  'seizure history',
  'sepsis',
  'sickle cell',
  'substance abuse',
  'tobacco use',
  'tuberculous',
  'ulcer',
  'Unknown',
  'visually impaired'
]

const illnessOptions = illnessList.map((illness) => ({
  key: illness,
  text: illness,
  value: illness
}))

export default class AddPatient extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      token: this.props.token,
      redFlags: [],
      basicInfo: {
        photoID: '',
        firstName: '',
        lastName: '',
        dob: '',
        birthPlace: '',
        licenseNum: '',
        race: ''
      },
      medicalHistory: [],
      notes: []
    }
  }

  componentDidMount() {
    console.log(illnessOptions)

    // load patient from PatientProfile info
  }


  handleChange = (evt, data) => {
    this.setState({
      [data.name]: data.value
    }, console.log(this.state))
  

    // this.setState({medicalHistory: this.state.medicalHistory.concat(evt.target.innerText)})
    // this.setState({medicalHistory: {value}})
    console.log(this.state.medicalHistory)
  }

  handleAddPatient(evt) {
    evt.preventDefault()
    console.log('hello')
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const dob = document.getElementById('dob').value
    const birthPlace = document.getElementById('birthPlace').value
    const licenseNum = document.getElementById('licenseNum').value
    const race = document.getElementById('race').value
    console.log(firstName)
    
    this.setState({
      basicInfo: {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        birthPlace: birthPlace,
        licenseNum: licenseNum,
        race: race
      }
    }, () => {    
      fetch('/patientAdd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        photoID: this.state.basicInfo.photoID,
        firstName: this.state.basicInfo.firstName,
        lastName: this.state.basicInfo.lastName,
        dob: this.state.basicInfo.dob,
        birthPlace: this.state.basicInfo.birthPlace,
        licenseNum: this.state.basicInfo.licenseNum,
        race: this.state.basicInfo.race,
        medicalHistory: this.state.medicalHistory,
        notes: [],
        redFlags: []
      })
    })
      .then(response => response.json())})

  }

  // handleSetState(evt) {
  //   // evt.preventDefault()
  //   const firstName = document.getElementById('firstName').value
  //   const lastName = document.getElementById('lastName').value
  //   const dob = document.getElementById('dob').value
  //   const birthPlace = document.getElementById('birthPlace').value
  //   const licenseNum = document.getElementById('licenseNum').value
  //   const race = document.getElementById('race').value
  //   console.log(firstName)
  //   this.setState({
  //     basicInfo:{
  //       firstName: firstName,
  //       lastName: lastName,
  //       dob: dob,
  //       birthPlace: birthPlace,
  //       licenseNum: licenseNum,
  //       race: race
  //     }
  //   }, () => {console.log(this.state, 'line 141')})
  // }

  render() {
    return (
      <div>
        <Header as='h1'>New Patient</Header>
        <Header as='h3'>Basic Info</Header>
        {/* add the image field here */}
        <Form id='basicInfo'>
          <Form.Field>
            <label>First Name</label>
            <input id='firstName' placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input id='lastName' placeholder='Last Name' />
          </Form.Field>
          <Form.Field >
            <label>Date of Birth</label>
            <input id='dob' placeholder='Date of Birth' />
          </Form.Field>
          <Form.Field>
            <label>Birth Place</label>
            <input id='birthPlace' placeholder='Birth Place' />
          </Form.Field>
          <Form.Field>
            <label>License Number</label>
            <input  id='licenseNum' placeholder='License Number' />
          </Form.Field>
          <Form.Field>
            <label>Race</label>
            <input id='race' placeholder='Race' />
          </Form.Field>
          {/* <Button type='submit' 
          content='Save' 
          icon='right arrow' 
          labelPosition='right' 
          onClick={()=> {this.handleSetState()}}
          style={{ border: '1px black solid' }} /> */}
        </Form>
        
        <Header as='h3'>Medical History</Header>
        <div>
          <Dropdown name='medicalHistory' id='illnessList' placeholder='Add Illness' fluid multiple search selection options={illnessOptions} onChange={this.handleChange.bind(this)} 
          />
        {/* <Button type='submit' content='Add' icon='right arrow' labelPosition='right' onClick={props.handleAddIllness} style={{ border: '1px black solid' }} /> */}
        </div><br />
        <Button type='submit' 
          content='Add Patient' 
          icon='right arrow' 
          labelPosition='right' 
          onClick={this.handleAddPatient.bind(this)}
          style={{ border: '1px black solid' }} />
  </div>
  )}
}
