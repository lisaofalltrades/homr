/* globals fetch */
import Login from './Login'
import Dashboard from './Dashboard'
import Settings from './Settings'
import PatientInfo from './Patients'
import React from 'react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
// import { response } from 'express'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      role: null,
      admin: null,
      token: null
    }
  }

  handleLogin (evt) {
    evt.preventDefault()
    console.log('Login prevent D')
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    this.setState({
      password: password,
      email: email
    })

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
        if (data.errorMsg) { alert('Invalid login credentials') }
        if (data.role !== 'general') {
          this.setState({
            admin: true
          })
        } else {
          this.setState({
            admin: false
          })
        }
        this.setState({
          email: data.email,
          password: data.password,
          token: data.token,
          role: data.role
        }, () => { console.log(this.state) })
      })
  }

  handleChange (evt) {
    const ids = [
      {
        key: 'Fire Chief',
        text: 'Fire Chief',
        value: 'fire_chief'
      },
      {
        key: 'Charity Rep',
        text: 'Charity Rep',
        value: 'charity_rep'
      },
      {
        key: 'City Rep',
        text: 'City Rep',
        value: 'city_rep'
      }
    ]
    const role = evt.target.innerText
    console.log(role)
    let finalId = ''
    ids.forEach(element => {
      if (role === element.key) {
        finalId = element.value
      }
    })
    this.setState({ role: finalId })
  }

  handleSignup (evt) {
    evt.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        role: this.state.role,
        admin: true
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          email: data.email,
          password: data.password,
          role: data.role,
          token: data.token,
          admin: true
        }, () => { console.log(this.state) })
      })
  }

  handleProfile (evt) {
    evt.preventDefault()
    console.log('it worked')
    const Fname = document.getElementById('Fname').value
    const Lname = document.getElementById('Lname').value
    const job_title = document.getElementById('job_title').value
    const city = document.getElementById('city').value
    const county = document.getElementById('county').value
    const district = document.getElementById('district').value

    fetch('/profileUpdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        Fname: Fname,
        Lname: Lname,
        email: this.state.email,
        password: this.state.password,
        // token: this.state.token,
        job_title: job_title,
        city: city,
        county: county,
        district: district
      })
    })
      .then(response => response.json())
      // .then(data => {
      //   this.setState({
      //     email: data.email,
      //     password: data.password,
      //     role: data.role,
      //     token: data.token,
      //     admin: true
      //   }, () => { console.log(this.state) })
      // })
  }

  handleLogout () {
    this.setState({
      email: '',
      password: '',
      role: null,
      admin: null,
      token: null
    })
  }

  render () {
    const panes = [
      {
        menuItem: 'Dashboard',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Tab panes={subpanesDashboard} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} />
          </Tab.Pane>
      },
      {
        menuItem: 'Patient Portal',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Tab panes={subpanesPatient} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} />
          </Tab.Pane>
      }
      {
        menuItem: 'Incident Map',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Tab panes={subpanesMap} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} />
          </Tab.Pane>
      }
    ]

    const subpanesDashboard = [
      {
        menuItem: 'Chart View',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Dashboard />
          </Tab.Pane>
      },
      {
        menuItem: 'Detail View',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Dashboard />
          </Tab.Pane>
      }
    ]

    const subpanesMap = [
      {
        menuItem: 'View Map',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Map />
          </Tab.Pane>
      },
      {
        menuItem: 'View Details',
        render: () =>
          <Tab.Pane attached={true} style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Map />
          </Tab.Pane>
      }
    ]
    
    const subpanesPatient = [
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
            <div style={{ 'text-align': 'left' }}>
              <Header as='h1'>Patient Name Value Call</Header>
              <div id='viewPatientInfo' style={{display: 'block'}}>
                <div>
                  <List>
                    <List.Item>
                      <List.Content>
                        <div style={{'background-color': 'red', height: '4em', 'border-radius': '6px', padding:'3px'}}>
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

    return (
      <Switch>
        <Route path='/login'>
          {this.state.token ? <Redirect to='/' /> : <Login handleLogin={this.handleLogin.bind(this)} handleSignup={this.handleSignup.bind(this)} handleChange={this.handleChange.bind(this)} />}
        </Route>
        <Route path='/'>
          {this.state.token ? <Tab panes={panes} style={{ width: '900px', margin: '0 auto' }} /> : <Redirect to='/login' />}
        </Route>
      </Switch>
    )

  }
}
