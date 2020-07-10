import React from 'react'
import { Header, List, Icon, Button } from 'semantic-ui-react'
import Notes from './patientInfo/Notes'
import { Link } from 'react-router-dom'
import EditPatient from './EditPatient'

const handleEditScreen = () => {
  const viewPatientInfoDiv = document.getElementById('viewPatientInfo')
  const editPatientInfoDiv = document.getElementById('editPatientInfo')

  viewPatientInfoDiv.style.display = 'none'
  editPatientInfoDiv.style.display = 'block'
}

export default function PatientProfile (props) {
// updated all auto fill fields austen 7/10

  return (
    <div style={{ 'text-align': 'left' }}>
      <Header as='h1'>{props.selectedPatient.id.firstName}</Header>
      <div id='viewPatientInfo' style={{ display: 'block' }}>
        <div>
          <List>
            <List.Item>
              <List.Content>
                <div style={{ 'background-color': 'red', height: '4em', 'border-radius': '6px', padding: '3px' }}>
                  <List.Header><Icon name='flag' />Red Flags</List.Header>
                  <List.Description>
                    {props.selectedPatient.id.redFlags
                      ? <ul>
                        {props.selectedPatient.id.redFlags.map(element => <li key={element}>{element}</li>)}
                      </ul> : <p>None</p>}
                  </List.Description>
                </div>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Full Name</List.Header>
                <List.Description>
                  {props.selectedPatient.id.firstName} {props.selectedPatient.id.lastName}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Date of Birth</List.Header>
                <List.Description>
                  {props.selectedPatient.id.dob}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Birthplace</List.Header>
                <List.Description>
                  {props.selectedPatient.id.birthPlace}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>License Number</List.Header>
                <List.Description>
                  {props.selectedPatient.id.licenseNum}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Ethnicity</List.Header>
                <List.Description>
                  {props.selectedPatient.id.race}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Medical History</List.Header>
                <List.Description>
                  <ul>
                    {props.selectedPatient.id.medicalHistory.map(element => <li key={element}>{element}</li>)}
                  </ul>
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Notes</List.Header>
                <List.Description>
                  {props.selectedPatient.id.notes}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Button onClick={handleEditScreen} content='EditPatient' />
            </List.Item>
          </List>
        </div><br />
        <div>
          <Notes token={props.token} patientId={props.selectedPatient.id} />
        </div>
      </div><br />
      <div id='editPatientInfo' style={{ display: 'none' }}>
        <EditPatient token={props.token} />
      </div><br />
    </div>
  )
}
