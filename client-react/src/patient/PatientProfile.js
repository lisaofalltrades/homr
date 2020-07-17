Patientimport React from 'react'
import { Header, List, Icon, Button } from 'semantic-ui-react'
import Notes from './Notes'
// import { Link } from 'react-router-dom'
import EditPatient from './EditPatient'
// import AppendNotes from './patientInfo/AppendNotes'


export default class PatientProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      placeholder: [],
      patientID: this.props.selectedPatient.patient._id,
      redFlags: this.props.selectedPatient.patient.redFlags,
      token: this.props.token
    }
  }

  componentDidMount() {
    console.log(this.props.selectedPatient, 'take a look at this')
  }

  handleEditScreen = () => {
    let viewPatientInfoDiv = document.getElementById('viewPatientInfo')
    let editPatientInfoDiv = document.getElementById('editPatientInfo')
  
    viewPatientInfoDiv.style.display = 'none'
    editPatientInfoDiv.style.display = 'block'
  }
  
  onhandleUpdateState = () => {
    console.log(this.props, 'this is the test ')
    this.props.selectedPatient.patient.notes = null
    setTimeout(this.setState({placeholder: []}), 800, console.log(this.state.placeholder))
    console.log('the leap of fame ran')
  }

  onhandleRedFlagUpdate = () => {
    fetch('/patientLookup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        patientID: this.state.patientID
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.data, 'this is data.data')
        console.log(data.data[0].redFlags, 'this is data.data.redFlags')
        this.setState({
          redFlags: data.data[0].redFlags
        }, this.setState({
          placeholder: []
        }, console.log(this.state, 'line 50, redFlags check')))
      })
  }
  
  render () {
    return (
      <div style={{ 'text-align': 'left' }}>
        <div id='viewPatientInfo' style={{ display: 'block' }}>
          <div>
            <Header as='h1'>{this.props.selectedPatient.patient.firstName} {this.props.selectedPatient.patient.lastName}</Header>
            <List>
              <List.Item>
                <List.Content>
                  <div style={{ height: '4em', borderRadius: '6px', padding: '3px' }}>
                    {/* <List.Header><Icon name='flag' />Red Flags</List.Header> */}
                    <List.Description>
                      {this.state.redFlags
                        ?  <ul style={{ paddingLeft: '5px', marginTop: '2px' }}>
                          {this.state.redFlags.map(element => <li key={element} className='flags'><Icon name='exclamation' />{element}</li>)}
                          </ul>
                        : 'None'
                      }
                    </List.Description>
                  </div>
                </List.Content>
              </List.Item>
            
              <List.Item>
                <List.Content>
                  <List.Header>Full Name</List.Header>
                  <List.Description>
                    {this.props.selectedPatient.patient.firstName} {this.props.selectedPatient.patient.lastName}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Date of Birth</List.Header>
                  <List.Description>
                    {this.props.selectedPatient.patient.dob}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Birthplace</List.Header>
                  <List.Description>
                    {this.props.selectedPatient.patient.birthPlace}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>License Number</List.Header>
                  <List.Description>
                    {this.props.selectedPatient.patient.licenseNum}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Ethnicity</List.Header>
                  <List.Description>
                    {this.props.selectedPatient.patient.race}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Medical History</List.Header>
                  <List.Description>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                      {this.props.selectedPatient.patient.medicalHistory.map(element => <li key={element}><Icon name='caret right' />{element}</li>)}
                    </ul>
                  </List.Description>
                </List.Content>
              </List.Item>
              <Button onClick={this.handleEditScreen} content='EditPatient' />
            </List>
                
            {this.props.selectedPatient.patient.notes
                ?
              <div>
                <Header>Patient Notes</Header>
                <table class="ui table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.selectedPatient.patient.notes.map(element =>
                      <tr>
                        <th>{element.date}</th>
                        <th>{element.category}</th>
                        <th>{element.description}</th>
                      </tr>)
                    }

                  </tbody>
                </table> 
              </div> : null}
              
          </div>

          <div>
            <Notes token={this.props.token} patientId={this.props.selectedPatient.patient} onhandleUpdateState={this.onhandleUpdateState} onhandleRedFlagUpdate={this.onhandleRedFlagUpdate}/>
         
          </div>
        </div><br />
        <div id='editPatientInfo' style={{ display: 'none' }}>
          <EditPatient onhandlePatientSelect={this.props.onhandlePatientSelect} token={this.props.token} selectedPatient={this.props.selectedPatient}/>
        </div><br />
      </div>
    )
  }
}

