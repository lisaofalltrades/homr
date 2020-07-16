import React from 'react'
import { Input, Button, Header, Tab, Dropdown, Icon } from 'semantic-ui-react'
export default function Login (props) {
  const roles = [
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
  const panes = [
    {
      menuItem: 'Login',
      render: () =>
        <Tab.Pane attached={false} style={{ backgroundColor: '#e5e5e5', border: '1px solid black' }}>
          <div style={{ textAlign: 'center' }}>
            <Header as='h1'>Login</Header>
            <form id='loginForm'>
              {/* <input id='email' type='email' placeholder='Email' /> */}
              <Input id='email' style={{ width: '18em' }} type='email' icon='mail' iconPosition='left' placeholder='Email' />
              <br /><br />
              <Input id='password' style={{ width: '18em' }} type='password' icon='lock' iconPosition='left' placeholder='Password' />
              <br /><br />
              <Button animated type='submit' onClick={props.handleLogin} style={{ border: '1px black solid', backgroundColor: '#98c9e4' }}>
                <Button.Content visible>Login</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </form>
          </div>
        </Tab.Pane>
    },
    {
      menuItem: 'Signup',
      render: () =>
        <Tab.Pane attached={false} style={{ backgroundColor: '#e5e5e5', border: '1px solid black' }}>
          <div style={{ textAlign: 'center' }}>
            <Header as='h1'>Signup</Header>
            <form id='signupForm'>
              {/* <input id='email' type='email' placeholder='Email' /> */}
              <Input id='email' style={{ width: '18em' }} type='email' icon='mail' iconPosition='left' placeholder='Email' />
              <br /><br />
              <Input id='password' style={{ width: '18em' }} type='password' icon='lock' iconPosition='left' placeholder='Password' />
              <br /><br />
              <Input style={{ width: '18em' }} type='password' icon='lock' iconPosition='left' placeholder='Confirm Password' />
              <br /><br />
              <Dropdown id='roles' style={{ width: '18em', margin: '0 auto', textAlign: 'center' }} placeholder='Select Role' fluid selection options={roles} onChange={props.handleChange} />
              <br /><br />

              <Button animated type='submit' onClick={props.handleSignup} style={{ border: '1px black solid', backgroundColor: '#98c9e4' }}>
                <Button.Content visible>Sign Up</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>

            </form>
          </div>
        </Tab.Pane>
    }
  ]
  return (
    <Tab panes={panes} menu={{ pointing: true }} style={{ width: '900px', margin: '0 auto' }} />
  )
}
