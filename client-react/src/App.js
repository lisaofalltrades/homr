/* globals fetch */
import Login from './Login'
import Settings from './Settings'
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
import { Tab, Menu } from 'semantic-ui-react'
import Map from './Map'
import PatientSearch from './PatientSearch'
import Metrics from './Metrics'
import UserProfile from './UserProfile'
import PatientProfile from './PatientProfile'
// import { response } from 'express'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      role: null,
      admin: null,
      token: null,
      selectedPatient: ''
    }
  }

  onhandlePatientSelect = (patientVal) => {
    this.setState({ selectedPatient: patientVal }, () => {console.log(this.state.selectedPatient,'you did it')})
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
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Tab panes={subpanesDashboard} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} />
          </Tab.Pane>
      },
      {
        menuItem: 'Patient Portal',
        render: () =>
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Tab panes={subpanesPatient} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} />
          </Tab.Pane>
      },
      {
        menuItem: 'Incidents',
        render: () =>
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Tab panes={subpanesIncidents} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} />
          </Tab.Pane>
      },
      {
        menuItem: <Menu.Item key='profile' style={{ 'margin-left': 'auto' }}>My Profile</Menu.Item>,
        render: () =>
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black',   }}>
            <Tab panes={subpanesProfile} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} />
          </Tab.Pane>
      }
    ]

    const subpanesDashboard = [
      {
        menuItem: 'Chart View',
        render: () =>
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Metrics />
          </Tab.Pane>
      },
      {
        menuItem: 'Detail View',
        render: () =>
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Metrics />
          </Tab.Pane>
      }
    ]

    const subpanesIncidents = [
      {
        menuItem: 'View Map',
        render: () =>
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Map />
          </Tab.Pane>
      },
      {
        menuItem: 'View Details',
        render: () =>
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black' }}>
            Most Recent Incidents List
          </Tab.Pane>
      }
    ]

    const subpanesPatient = [
      {
        menuItem: 'Patient Search',
        render: () =>
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <PatientSearch token={this.state.token} onhandlePatientSelect={this.onhandlePatientSelect} />
          </Tab.Pane>
      },
      {
        menuItem: 'Patient Profile',
        render: () =>
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <PatientProfile token={this.state.token} patientId={this.state.patientId} />
               {/* this is the last thing worked on 7/9/2020 */}
          </Tab.Pane>
      }
    ]

    const subpanesProfile = [
      {
        menuItem: 'View Profile',
        render: () =>
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <UserProfile />
          </Tab.Pane>
      },
      {
        menuItem: 'Edit Profile',
        render: () =>
          <Tab.Pane attached style={{ 'background-color': 'silver', border: '1px solid black' }}>
            <Settings role={this.state.role} handleProfile={this.handleProfile.bind(this)} />
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

export default App
