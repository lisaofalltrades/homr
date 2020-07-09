import React from 'react'
import { List, Icon, Header, Button, Tab, Divider, Grid, Segment, Form, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SearchPatients from './Search'
import PatientInfo from './Patients'
// import _ from 'lodash'

export default class PatientSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: this.props.token
    }
  }

  render () {
    return (
      <div>
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
        <br />
        <br />
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
      </div>
    ) 
}
}
