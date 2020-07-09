import React from 'react'
import { List, Icon, Header, Button, Tab, Divider, Grid, Segment, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SearchPatients from './Search'
import PatientInfo from './Patients'
import PatientProfile from './PatientProfile'

export default class PatientPortal extends React.Component {

  render () {
    const subpanes = [
      {
        menuItem: 'Patient Search',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <div style={{ 'text-align': 'left' }}>
              <Header as='h1'>Patient View</Header>
              <Segment placeholder>
                <Grid columns={2} stackable textAlign='center'>
                  <Grid.Column verticalAlign='middle'>
                    <SearchPatients token={this.state.token} />
                  </Grid.Column>

                  <Grid.Column verticalAlign='middle'>
                    <Button icon size='massive' labelPosition='right'>Add Patient <Icon name='user' /></Button>
                  </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
              </Segment>
            </div>
          </Tab.Pane>
      },
      {
        menuItem: 'Patient Profile',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <div id='viewPatientInfo' style={{display: 'block'}}>
              <PatientProfile />
            </div>
            <div id='editPatientInfo' style={{display: 'block'}}>
              <PatientInfo />
            </div>
          </Tab.Pane>
      }
    ]
    const panes = [
      {
        menuItem: 'Patient View',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Tab panes={subpanes} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} />
          </Tab.Pane>
      },
      {
        menuItem: 'Dashboard',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <div style={{ 'text-align': 'center' }}>
              <Header as='h1'>Patient Edit</Header>
            </div>
          </Tab.Pane>
      }
    ]
    return(
      <Tab panes={panes} style={{ width: '900px', margin: '0 auto' }} />
    )
  }
}