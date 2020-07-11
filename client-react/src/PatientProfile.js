import React from 'react'
import { Header, List, Icon, Button } from 'semantic-ui-react'
import Notes from './patientInfo/Notes'
import { Link } from 'react-router-dom'
import EditPatient from './EditPatient'
import AppendNotes from './patientInfo/AppendNotes'

// const handleEditScreen = () => {
//   let viewPatientInfoDiv = document.getElementById('viewPatientInfo')
//   let editPatientInfoDiv = document.getElementById('editPatientInfo')

//   viewPatientInfoDiv.style.display = 'none'
//   editPatientInfoDiv.style.display = 'block'
// }



export default class PatientProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      placeholder: []
    }
  }



  handleEditScreen = () => {
    let viewPatientInfoDiv = document.getElementById('viewPatientInfo')
    let editPatientInfoDiv = document.getElementById('editPatientInfo')
  
    viewPatientInfoDiv.style.display = 'none'
    editPatientInfoDiv.style.display = 'block'
  }
  
  onhandleUpdateState = () => {
    console.log(this.props, 'this is the test ')
    this.props.selectedPatient.id.notes = null
    setTimeout(this.setState({placeholder: []}), 800, console.log(this.state.placeholder))
    console.log('the leap of fame ran')
  }
  
  render () {
    return (
      <div style={{ 'text-align': 'left' }}>
        <Header as='h1'>{this.props.selectedPatient.id.firstName}</Header>
        <div id='viewPatientInfo' style={{ display: 'block' }}>
          <div>
            <List>
              <List.Item>
                <List.Content>
                  <div style={{ 'background-color': 'red', height: '4em', 'border-radius': '6px', padding: '3px' }}>
                    <List.Header><Icon name='flag' />Red Flags</List.Header>
                    <List.Description>
                      {this.props.selectedPatient.id.redFlags
                        ? <ul>
                          {this.props.selectedPatient.id.redFlags.map(element => <li key={element}>{element}</li>)}
                        </ul> : <p>None</p>}
                    </List.Description>
                  </div>
                </List.Content>
              </List.Item>
              <List.Item>
                <Button onClick={this.handleEditScreen} content='EditPatient' />
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Full Name</List.Header>
                  <List.Description>
                    {this.props.selectedPatient.id.firstName} {this.props.selectedPatient.id.lastName}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Date of Birth</List.Header>
                  <List.Description>
                    {this.props.selectedPatient.id.dob}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Birthplace</List.Header>
                  <List.Description>
                    {this.props.selectedPatient.id.birthPlace}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>License Number</List.Header>
                  <List.Description>
                    {this.props.selectedPatient.id.licenseNum}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Ethnicity</List.Header>
                  <List.Description>
                    {this.props.selectedPatient.id.race}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Medical History</List.Header>
                  <List.Description>
                    <ul>
                      {this.props.selectedPatient.id.medicalHistory.map(element => <li key={element}>{element}</li>)}
                    </ul>
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Notes</List.Header>
                  <List.Description>
                    {this.props.selectedPatient.id.notes
                      ? <ul>
                        {this.props.selectedPatient.id.notes.map(element => <li key={element}>{element.description}</li>)}
                      </ul>
                      : null }
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </div>
          <div>
            <Notes token={this.props.token} patientId={this.props.selectedPatient.id} onhandleUpdateState={this.onhandleUpdateState}/>
          </div>
        </div><br />
        <div id='editPatientInfo' style={{ display: 'none' }}>
          <EditPatient token={this.props.token} />
        </div><br />
      </div>
    )
  }
}

