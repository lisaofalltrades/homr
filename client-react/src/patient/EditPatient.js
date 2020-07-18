import React from 'react'
import { Header, Button, Form, Dropdown } from 'semantic-ui-react'
// import PatientProfile from './PatientSearch'

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

export default class EditPatient extends React.Component {
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
    // console.log(illnessOptions)
    // console.log(this.props, 'Edit Patient Page: this is the props')
    // console.log(this.props.selectedPatient.patient)
    // console.log(this.state)
    // load patient from PatientProfile info
  }

  handleChange = (evt, data) => {
    this.setState({
      [data.name]: data.value
    }, console.log(this.state))
    // this.setState({medicalHistory: this.state.medicalHistory.concat(evt.target.innerText)})
    // this.setState({medicalHistory: {value}})
    // console.log('State from medicalHistory')
    // console.log(this.state.medicalHistory)
  }

  handleEditPatient() {
    let editForm = document.getElementById('basicInfo')
    editForm.reset()
    console.log(this.props, 'check this out ')
    fetch('/patientEdit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        patientID: this.props.selectedPatient.patient._id,
        photoID: this.state.basicInfo.photoID,
        firstName: this.state.basicInfo.firstName,
        lastName: this.state.basicInfo.lastName,
        dob: this.state.basicInfo.dob,
        birthPlace: this.state.basicInfo.birthPlace,
        licenseNum: this.state.basicInfo.licenseNum,
        race: this.state.basicInfo.race,
        medicalHistory: this.state.medicalHistory,
      })
    })
      .then(response => response.json())
      .then((data => console.log(data, 'this is the data')))
  }

  handleSetState(evt) {
    evt.preventDefault()
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const dob = document.getElementById('dob').value
    const birthPlace = document.getElementById('birthPlace').value
    const licenseNum = document.getElementById('licenseNum').value
    const race = document.getElementById('race').value
    this.setState({
      basicInfo:{
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        birthPlace: birthPlace,
        licenseNum: licenseNum,
        race: race
      }
    }, () => {console.log(this.state, 'line 141')})
  }

  render() {
    const patient = this.props.selectedPatient.patient

    return (
      <div>
        <Header as='h1'>Edit Patient</Header>
        <Header as='h3'>Basic Info</Header>
        {/* add the image field here */}
        <Form id='basicInfo'>
          <Form.Field>
            <label>First Name</label>
            {patient.firstName ? <input id='firstName' placeholder={patient.firstName} /> : <input id='firstName' placeholder='First Name' />}
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            {patient.lastName ? <input id='lastName' placeholder={patient.lastName} /> : <input id='lastName' placeholder='Last Name' />}
          </Form.Field>
          <Form.Field >
            <label>Date of Birth</label>
            {patient.dob ? <input id='dob' placeholder={patient.dob} /> : <input id='dob' placeholder='Date of Birth' />}
          </Form.Field>
          <Form.Field>
            <label>Birth Place</label>
            {patient.birthPlace ? <input id='birthPlace' placeholder={patient.birthPlace} /> : <input id='birthPlace' placeholder='Birth Place' />}
          </Form.Field>
          <Form.Field>
            <label>License Number</label>
            {patient.licenseNum ? <input id='licenseNum' placeholder={patient.licenseNum} /> : <input id='licenseNum' placeholder='License Number' /> }
          </Form.Field>
          <Form.Field>
            <label>Race</label>
            {patient.race ? <input id='race' placeholder={patient.race} /> : <input id='race' placeholder='Race' />}
          </Form.Field>
          <Button type='submit' 
          content='Save' 
          icon='right arrow' 
          labelPosition='right' 
          onClick={this.handleSetState.bind(this)}
          style={{ border: '1px black solid' }} />
        </Form>
        
        <Header as='h3'>Medical History</Header>
        <div>
          {patient.medicalHistory ? <Dropdown name='medicalHistory' id='illnessList' placeholder={patient.medicalHistory} fluid multiple search selection options={illnessOptions} onChange={this.handleChange.bind(this)} /> : <Dropdown name='medicalHistory' id='illnessList' placeholder='Add Illness' fluid multiple search selection options={illnessOptions} onChange={this.handleChange.bind(this)} />}
         
        </div><br />
        <Button type='submit' 
          content='Edit Patient' 
          icon='right arrow' 
          labelPosition='right' 
          onClick={() => {this.handleSetState.bind(this); this.handleEditPatient.bind(this)()}}
          style={{ border: '1px black solid' }} />
  </div>
  )}
}

// look at
// ; this.props.onhandlePatientSelect(this.props.selectedPatient)