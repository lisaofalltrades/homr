/* globals fetch */
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
        this.setState({
          email: data.email,
          password: data.password,
          token: data.token
        }, () => { console.log(this.state) })
      })
  }

  handleSignup (evt) {
    evt.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const role = document.getElementById('roles').value

    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
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

  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route path='/login'>
              {this.state.token ? <Redirect to='/' /> : <Login handleLogin={this.handleLogin.bind(this)} />}
            </Route>
            <Route path='/signUp'>
              {this.state.token ? <Redirect to='/' /> : <Signup handleSignup={this.handleSignup.bind(this)} />}
            </Route>
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
