import React from 'react'
import { List, Icon, Header, Button, Divider, Grid, Segment, PaginationProps, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import SearchPatients from './Search'
import PatientInfo from './Patients'
// import _ from 'lodash'

export default class PatientSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: this.props.token,
      patientsData: [],
      patients: [],
      begin: 0,
      end: 3,
      activePage: 1,
      filter: null
    }
  }

  componentDidMount() {
    this.setState({patientsData: []})
    fetch('/allPatients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        filter: this.state.filter
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          patientsData: data.data
        }, () => { console.log(this.state, 'this is loadPatients') })
      })
    this.setState({
      patients: this.state.patientsData.slice(this.state.begin, this.state.end)
    }, () => { console.log(this.state, 'this is didMount') })
  }

  handlePageChange(event: React.MouseEvent<HTMLAnchorElement>, data: this) {
    console.log(data.activePage)
    this.setState({activePage: data.activePage});
    this.setState({begin: this.state.activePage * 10 - 10});
    this.setState({end: this.state.activePage * 10});
    this.setState({
      patients: this.state.patientsData.slice(this.state.begin, this.state.end),
    });
  }

  loadPatients () {
    fetch('/allPatients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        filter: this.state.filter
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          patientsData: data.data
        }, () => { console.log(this.state, 'this is loadPatients') })
      })
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
          <Header as='h3'>Display patients by:</Header>
            <Button onClick={this.handleRecentFilter} content='Most Recent' />
            <Button onClick={this.handleFirstNameFilter} content='First Name' />
            <Button onClick={this.handleLastNameFilter} content='Last Name' />
          </div>
          <br />
          <div id='patientList'>
            <List celled>
              {( this.state.patients ).map((patient, i) => {
                return (
                  <List.Item as='Link'>
                    <List.Content>
                      <List.Header>{patient.lastName}, {patient.firstName}</List.Header>
                        Date of Birth: {patient.dob} Red Flags: {patient.redFlags}
                    </List.Content>
                  </List.Item>
                )
              })}
            </List>
          </div>
          <br />
          <div id='listPaginator'>
            <Pagination
              boundaryRange={0}
              activePage={this.state.activePage}
              siblingRange={1}
              defaultActivePage={1}
              onPageChange={this.handlePageChange.bind(this)}
              totalPages={Math.ceil(this.state.patients.length / 10)}
            />
          </div>
        </div>
      </div>
    ) 
  }
}
