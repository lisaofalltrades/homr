/* globals fetch */
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import Patients from './Patients'
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
    const Fname = document.getElementById('Fname').value
    const Lname = document.getElementById('Lname').value
    const job_title = document.getElementById('job_title').value
    const city = document.getElementById('city').value
    const county = document.getElementById('county').value
    const district = document.getElementById('district').value

    fetch('/profileUpdate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Fname: Fname,
        Lname: Lname,
        token: this.state.token,
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
    return (
      <Router>
        <div>
          <nav id='navBar'>
            {this.state.token
              ? <div>
                <Link to='/'>Home</Link>
                <Link to='/patientportal'>Patient Portal</Link>
                <Link to='/logout' onClick={this.handleLogout.bind(this)}>Logout</Link>
                <Link to='/settings'>Settings</Link>
              </div>
              : null}
          </nav>
        </div>
        <div>
          <Switch>
            <Route path='/settings'>
              {this.state.token ? <Settings role={this.state.role} handleProfile={this.handleProfile.bind(this)} /> : <Login handleLogin={this.handleLogin.bind(this)} />}
            </Route>
            <Route path='/logout'>
              <Redirect to='/login' />
            </Route>
            <Route path='/patientportal'>
              {this.state.token ? <Patients /> : <Login handleLogin={this.handleLogin.bind(this)} />}
            </Route>
            <Route path='/login'>
              {this.state.token ? <Redirect to='/' /> : <Login handleLogin={this.handleLogin.bind(this)} handleSignup={this.handleSignup.bind(this)} handleChange={this.handleChange.bind(this)} />}
            </Route>
            {/* <Route path='/signUp'>
              {this.state.token ? <Redirect to='/' /> : <Signup  />}
            </Route> */}
            <Route path='/'>
              {this.state.token ? <Dashboard /> : <Redirect to='/login' />}
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
