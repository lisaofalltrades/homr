import React from 'react'
import { List, Icon, Header, Button, Tab, Divider, Grid, Segment, Form, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SearchPatients from './Search'
import PatientInfo from './Patients'
// import _ from 'lodash'

export default class PatientProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: this.props.token
    }
  }

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
            <br /><br />
            <div id='viewAllPatients'>
              <div id='patientFilter'>
                Sort by:
                <Button onClick={this.handleRecentFilter} content='Most Recent' />
                <Button onClick={this.handleFirstNameFilter} content='First Name' />
                <Button onClick={this.handleLastNameFilter} content='Last Name' />
              </div>
              <br />
              <div id='patientList'>
                <List celled>
                  <List.Item as='Link'>
                    {/* <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' /> */}
                    <List.Content>
                      <List.Header>lastName, firstName</List.Header>
                      Date of Birth: dob Last Known Location: lastIncidentLocation Red Flags: redFlags
                    </List.Content>
                  </List.Item>
                  <List.Item as='Link'>
                    {/* <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' /> */}
                    <List.Content>
                      <List.Header>lastName2, firstName2</List.Header>
                      Date of Birth: dob Last Known Location: lastIncidentLocation Red Flags: redFlags
                    </List.Content>
                  </List.Item>
                  <List.Item as='Link'>
                    {/* <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' /> */}
                    <List.Content>
                      <List.Header>lastName3, firstName3</List.Header>
                      Date of Birth: dob Last Known Location: lastIncidentLocation Red Flags: redFlags
                    </List.Content>
                  </List.Item>
                </List>
              </div>
              <br />
              <div id='listPaginator'>
                <Pagination
                  boundaryRange={0}
                  defaultActivePage={1}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={1}
                  totalPages={10}
                />
              </div>
            </div>
          </Tab.Pane>
      },
      {
        menuItem: 'Patient Profile',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <div style={{ 'text-align': 'left' }}>
              <Header as='h1'>Patient Name Value Call</Header>
              <div id='viewPatientInfo' style={{display: 'block'}}>
                <div>
                  <List>
                    <List.Item>
                      <List.Content>
                        <div style={{'background-color': 'red', height: '4em', 'border-radius': '6px', padding: '3px' }}>
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
                    <List.Item as={Link} to="/addPatient">
                      Edit Patient
                    </List.Item>
                  </List>
                </div><br />
                <div>
                  <Header>Add a Note</Header>
                  <Form>
                    <Form.Field>
                      <label>Date</label>
                      <input type='date' />
                    </Form.Field>
                    <Form.Field>
                      <label>Category</label>
                      <input type='text' />
                    </Form.Field>
                    <Form.Field>
                      <label>Address</label>
                      <input type='text' />
                    </Form.Field>
                    <Form.Field>
                      <label>Description</label>
                      <textarea />
                    </Form.Field>
                    <Button content='Save Note' type='submit' icon='right arrow' labelPosition='right' />
                  </Form>
                </div>
              </div>
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
            {/* <div style={{ 'text-align': 'center' }}>
              <Header as='h1'>Patient View</Header>
            </div> */}
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
    return (
      <Tab panes={panes} style={{ width: '900px', margin: '0 auto' }} />
    )}
}