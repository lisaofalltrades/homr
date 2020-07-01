import React from 'react'
import { Input, Accordion, Icon, Button, Form, Dropdown } from 'semantic-ui-react'
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
export default class PatientInfo extends React.Component {
  state = { 
    activeIndex: 0,
    redFlags: [],
    basicInfo: {
      photoID: null,
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
  componentDidMount() {
    console.log(illnessOptions)
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  handleChange ({value}) {
    // this.setState({medicalHistory: this.state.medicalHistory.concat(evt.target.innerText)})
    this.setState({medicalHistory: {value}})
    console.log(this.state.medicalHistory)
  }
  render() {
    const { activeIndex } = this.state
    return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={this.handleClick}
      >
      <Icon name='dropdown' />
      Red Flags
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
      These are red flags!
      </Accordion.Content>
      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={this.handleClick}
      >
      <Icon name='dropdown' />
      Basic Info
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
      Patient basic information
      {/* add the image field here */}
      <Form>
      <Input id='firstName' type='text'/>
      <Input id='lastName' type='text'/>
      <Input id='dob' type=''/>
      <Input id='birthPlace' type='text'/>
      <Input id='licenseNum' type='text'/>
      <Input id='race' type='text'/>
      </Form>  
      </Accordion.Content>
      <Accordion.Title
        active={activeIndex === 2}
        index={2}
        onClick={this.handleClick}
      >
      <Icon name='dropdown' />
      Medical History
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 2}>
      Patient Medical History
      <div>
      {/* <Input list='illnessList' placeholder='Select illness to add...' /> */}
      {/* <datalist id='illnessList'>
        {illnessList.map(item => {
          return <option value={item} />
        })}
      </datalist> */}
      <Dropdown id='illnessList' placeholder='Add Illness' fluid multiple search selection clearable value={illnessOptions} options={illnessOptions} onChange= {this.handleChange.bind(this)} />
      {/* <Button type='submit' content='Add' icon='right arrow' labelPosition='right' onClick={props.handleAddIllness} style={{ border: '1px black solid' }} /> */}
    </div>
      </Accordion.Content>
      <Accordion.Title
        active={activeIndex === 3}
        index={3}
        onClick={this.handleClick}
      >
      <Icon name='dropdown' />
      Notes
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 3}>
      Patient Notes
      </Accordion.Content>
    </Accordion>
  )}
}