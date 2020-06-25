import React from 'react'
import './App.css'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'



class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    
  }

  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route path='/login' />
            <Route path='/signUp' />
            <Route path='/'>TEST!</Route>
          </Switch>
        </div>
      </Router> 
    )
  }
}

export default App
