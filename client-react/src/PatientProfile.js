import React from 'react'
import { Header, List, Icon, Button } from 'semantic-ui-react'
import Notes from './patientInfo/Notes'
import { Link } from 'react-router-dom'
import EditPatient from './EditPatient'

const handleEditScreen = () => {
  let viewPatientInfoDiv = document.getElementById('viewPatientInfo')
  let editPatientInfoDiv = document.getElementById('editPatientInfo')

  viewPatientInfoDiv.style.display = 'none'
  editPatientInfoDiv.style.display = 'block'
}

export default function PatientProfile (props) {
  // now we have have the idof the patient
  return (
    <div style={{ 'text-align': 'left' }}>
      <Header as='h1'>Patient Name Value Call</Header>
      <div id='viewPatientInfo' style={{ display: 'block' }}>
        <div>
          <List>
            <List.Item>
              <List.Content>
                <div style={{ 'background-color': 'red', height: '4em', 'border-radius': '6px', padding: '3px' }}>
                  <List.Header><Icon name='flag' />Red Flags</List.Header>
                  <List.Description>
                    Druggie
                  </List.Description>
                </div>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Full Name</List.Header>
                <List.Description>
                  Marshall Mathers
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Date of Birth</List.Header>
                <List.Description>
                  6/7/73
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Birthplace</List.Header>
                <List.Description>
                  Detroit, MI
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>License Number</List.Header>
                <List.Description>
                  A123455
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Ethnicity</List.Header>
                <List.Description>
                  White/Caucasian
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Medical History</List.Header>
                <List.Description>
                  Dr. Dre: Depression
                  Self Diagnosed: Rap God
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Notes</List.Header>
                <List.Description>
                  Hates his mom
                  Other stuff
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Button onClick={handleEditScreen} content='EditPatient' />
            </List.Item>
          </List>
        </div><br />
        <div>
          <Notes token={props.token} />
        </div>
      </div><br />
      <div id='editPatientInfo' style={{display: 'none'}}>
        <EditPatient token={props.token} />
      </div><br />
    </div>
  )
}