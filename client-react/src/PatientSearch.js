import React from 'react'
import { List, Icon, Header, Button, Divider, Grid, Segment, PaginationProps, Pagination } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import SearchPatients from './Search'
import AddPatient from './AddPatient'
// import _ from 'lodash'

export default class PatientSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: this.props.token,
      patientsData: [],
      patients: [],
      begin: 0,
      end: 10,
      activePage: 1,
      filter: 'lastName'
    }
  }

  handleAddScreen () {
    let addPatientDiv = document.getElementById('addPatient')
    let searchPatientDiv = document.getElementById('searchPatient')

    searchPatientDiv.style.display = 'none'
    addPatientDiv.style.display = 'block'

  }

  componentDidMount() {
    // this.setState({patientsData: []})
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
        }, () => { 
          if (this.state.filter === 'firstName') {
            this.state.patientsData.sort(function(a, b){
              if(a.firstName < b.firstName) { return -1; }
              if(a.firstName > b.firstName) { return 1; }
              return 0;
            })
          }
          if (this.state.filter === 'lastName') {
            this.state.patientsData.sort(function(a, b){
              if(a.lastName < b.lastName) { return -1; }
              if(a.lastName > b.lastName) { return 1; }
              return 0;
            })
          }
        this.setState({
          patients: this.state.patientsData.slice(this.state.begin, this.state.end)
        }, () => { console.log(this.state, 'this is didMount') }) })
      })
    
  }

  handlePageChange(event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) {
    console.log(data.activePage, 'this is data.activePage')
    this.setState({activePage: data.activePage}, () => {
      this.setState({
        begin: this.state.activePage * 10 - 10,
        end: this.state.activePage * 10
      }, () => {
        this.setState({
          patients: this.state.patientsData.slice(this.state.begin, this.state.end)
        })
      })
    })
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
        }, () => { 
          if (this.state.filter === 'firstName') {
            this.state.patientsData.sort(function(a, b){
              if(a.firstName < b.firstName) { return -1; }
              if(a.firstName > b.firstName) { return 1; }
              return 0;
            })
          }
          if (this.state.filter === 'lastName') {
            this.state.patientsData.sort(function(a, b){
              if(a.lastName < b.lastName) { return -1; }
              if(a.lastName > b.lastName) { return 1; }
              return 0;
            })
          }
          this.setState({
          patients: this.state.patientsData.slice(this.state.begin, this.state.end)
        }, () => { console.log(this.state, 'this is loadPatients') }) })
      })
  }

  handleLastNameFilter () {
    this.setState({filter: 'lastName'}, () => this.loadPatients())
  }
  handleFirstNameFilter () {
    this.setState({filter: 'firstName'}, () => this.loadPatients())
  }
  handleRecentFilter () {
    this.setState({filter: 'lastName'}, () => this.loadPatients())
  }

  render () {
    return (
      <div>
      <div id='searchPatient'>
        <div style={{ 'text-align': 'left' }}>
          <Header as='h1'>Patient View</Header>
          <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
              <Grid.Column verticalAlign='middle'>
                <Header as='h2'>Search for a patient:</Header>
                <SearchPatients onhandlePatientSelect={this.props.onhandlePatientSelect} token={this.state.token} />
              </Grid.Column>

              <Grid.Column verticalAlign='middle'>
                <Button onClick={this.handleAddScreen.bind(this)} icon size='massive' labelPosition='right'>Add Patient <Icon name='user' /></Button>
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
          <Button.Group>
            <Button onClick={this.handleLastNameFilter.bind(this)} content='Last Name' active />
            <Button onClick={this.handleFirstNameFilter.bind(this)} content='First Name' />
            <Button onClick={this.handleRecentFilter.bind(this)} content='Most Recent' />
          </Button.Group>
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
              boundaryRange={10}
              siblingRange={5}
              activePage={this.state.activePage}
              defaultActivePage={1}
              onPageChange={this.handlePageChange.bind(this)}
              totalPages={Math.ceil((this.state.patients.length + 1) / 10)}
              />
          </div>
        </div>
      </div>
        <div id='addPatient' style={{display: 'none'}}>
          <AddPatient token={this.state.token} />
        </div>
      </div>
    ) 
  }
}
