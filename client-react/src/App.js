/* globals fetch */
import Login from './authentication/Login'
import Settings from './user/EditProfile'
import React from 'react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Tab, Menu } from 'semantic-ui-react'
import Map from './map/Map'
import PatientSearch from './patient/PatientSearch'
import Metrics from './metrics/Metrics'
import UserProfile from './user/UserProfile'
import PatientProfile from './patient/PatientProfile'
import DataBreakdown from './metrics/DataBreakdown'
import AddTeam from './user/AddTeam'
import ViewDetails from './metrics/IncidentDetails'
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
      selectedPatient: '',
      profileIndex: 0,
      settingsIndex: 0,
      currentUser: '',
      notes: []
    }
  }
  
  onhandleGetNotes(token) {
    console.log('Query all notes')
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
          this.setState({
            notes: data
          })
      })
  }

  onhandlePatientSelect = (patientVal) => {
    this.setState({ selectedPatient: patientVal }, () => {

      const patientProfilePane = document.getElementById('patientProfilePane')
      patientProfilePane.style.display = 'block'
      if(!this.state.selectedPatient) {
        patientProfilePane.style.display = 'none'
      }
      this.setState({
        profileIndex: 1
      }, console.log(this.state, 'this is the apps state'))
    })

      // const patientProfileTab = document.getElementById('patientProfileTab')
    // console.log(panes[2])
  // console.log(patientProfileTab)
  // patientProfileTab.active = true
  }

  handleTabChange = (e, { activeIndex }) => this.setState({ profileIndex: activeIndex, settingsIndex: activeIndex })

  handleLogin (evt) {
    evt.preventDefault()
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
          role: data.role,
          currentUser: data.currentUser
        }, () => { 
          fetch('/notes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.state.token}`
            }
          })
          .then(response => response.json())
          .then(data => {
              this.setState({
                notes: data
              }, () => console.log(this.state))
          })
         })
      })
      
        
  }

  handleLogout = () => {
    this.setState({
      email: '',
      password: '',
      role: null,
      admin: null,
      token: null,
      selectedPatient: '',
      profileIndex: 0
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
          admin: true,
          currentUser: data.currentUser
        }, () => { 
          fetch('/notes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.state.token}`
            }
          })
          .then(response => response.json())
          .then(data => {
              this.setState({
                notes: data
              })
          })
        })
      })
  }

  handleProfile (evt) {
    evt.preventDefault()
    const Fname = document.getElementById('Fname').value
    const Lname = document.getElementById('Lname').value
    const job_title = document.getElementById('job_title').value
    const city = document.getElementById('city').value
    const county = document.getElementById('county').value
    const district = document.getElementById('district').value

    const profile = document.getElementById('profileForm')

    

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
      .then(data => {
        this.setState({
          currentUser: data,
          settingsIndex: 0
          
        }, () => {
          profile.reset()
        })
      })
  }

  render () {
    const panes = [
      {
        menuItem: 'Dashboard',
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            <Tab panes={subpanesDashboard} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} />
          </Tab.Pane>
      },
      {
        menuItem: 'Patient Portal',
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            <Tab panes={subpanesPatient} onTabChange={this.handleTabChange.bind(this)} activeIndex={this.state.profileIndex} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} />
          </Tab.Pane>
      },
      {
        menuItem: 'Incidents',
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            <Tab panes={subpanesIncidents} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} />
          </Tab.Pane>
      },
      {
        menuItem: <Menu.Item key='profile' style={{ 'margin-left': 'auto' }}>Settings</Menu.Item>,
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black',   }}>
            <Tab panes={subpanesProfile} menu={{ secondary: true, pointing: true }} style={{ width: '100%', margin: '0 auto' }} onTabChange={this.handleTabChange.bind(this)} activeIndex={this.state.settingsIndex}/>
          </Tab.Pane>
      },
      {
        menuItem: <Menu.Item onClick={this.handleLogout} key='logout' style={{ 'margin-left': '2px' }}>Logout</Menu.Item>,
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black',   }}>

          </Tab.Pane>
      }
    ]

    const subpanesDashboard = [
      {
        menuItem: 'Summary',
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            <Metrics token={this.state.token} notes={this.state.notes} />
          </Tab.Pane>
      },
      {
        menuItem: 'Details',
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            <DataBreakdown onhandleGetNotes={this.onhandleGetNotes} token={this.state.token} notes={this.state.notes}/>
          </Tab.Pane>
      }
    ]

    const subpanesIncidents = [
      {
        menuItem: 'View Map',
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            <Map token={this.state.token} notes={this.state.notes}/>
          </Tab.Pane>
      },
      {
        menuItem: 'View Details',
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            Most Recent Incidents List
            <ViewDetails token={this.state.token} notes={this.state.notes} />
          </Tab.Pane>
      }
    ]

    const subpanesPatient = [
      {
        menuItem: 'Patient Search',
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            <PatientSearch token={this.state.token} onhandlePatientSelect={this.onhandlePatientSelect} />
          </Tab.Pane>
      },
      {
        menuItem: <Menu.Item key='profile' id='patientProfilePane' style={{ display: 'none' }}>Patient Profile</Menu.Item>,
        render: () =>
          <Tab.Pane id='patientProfileTab' attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            <PatientProfile onhandlePatientSelect={this.onhandlePatientSelect} token={this.state.token} selectedPatient={this.state.selectedPatient} />
          </Tab.Pane>
      }
    ]

    const subpanesProfile = [
      {
        menuItem: 'View Profile',
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            <UserProfile profileData={this.state.currentUser} />
          </Tab.Pane>
      },
      {
        menuItem: 'Edit Profile',
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            <Settings profileData={this.state.currentUser} handleProfile={this.handleProfile.bind(this)} />
          </Tab.Pane>
      },
      {
        menuItem: 'Add Teammates',
        render: () =>
          <Tab.Pane attached style={{ backgroundColor: '#f0f3fb', border: '1px solid black' }}>
            <AddTeam password={this.state.password} email={this.state.email} />
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
          {/* <Tab panes={panes} style={{ width: '900px', margin: '0 auto' }} /> */}
        </Route>
      </Switch>
    )
  }
}

export default App
