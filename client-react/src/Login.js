// import React from 'react'

// export default function Login (props) {
//   return (
//     <div>
//       <h1>Login</h1>
//       <form id='loginForm'>
//         <input id='email' type='email' placeholder='Email' />
//         <br />
//         <input id='password' type='password' placeholder='Password' />
//         <button type='submit' onClick={props.handleLogin}>Submit</button>
//       </form>
//     </div>
//   )
// }
import React from 'react'
import { Input, Button, Header, Tab, Dropdown } from 'semantic-ui-react'
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
        <Tab.Pane attached={false} style={{ backgroundColor: 'silver', border: '1px solid black' }}>
          <div style={{ textAlign: 'center' }}>
            <Header as='h1'>Login</Header>
            <form id='loginForm'>
              {/* <input id='email' type='email' placeholder='Email' /> */}
              <Input id='email' style={{ width: '18em' }} type='email' icon='mail' iconPosition='left' placeholder='Email' />
              <br /><br />
              <Input id='password' style={{ width: '18em' }} type='password' icon='lock' iconPosition='left' placeholder='Password' />
              <br /><br />
              {/* <input id='password' type='password' placeholder='Password' /> */}
              <Button type='submit' content='Login' icon='right arrow' labelPosition='right' onClick={props.handleLogin} style={{ border: '1px black solid' }} />
              {/* <button type='submit' onClick={props.handleLogin}>Submit</button> */}
            </form>
          </div>
        </Tab.Pane>
    },
    {
      menuItem: 'Signup',
      render: () =>
        <Tab.Pane attached={false} style={{ backgroundColor: 'silver', border: '1px solid black' }}>
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
              {/* <input id='password' type='password' placeholder='Password' /> */}
              <Button type='submit' content='Signup' icon='right arrow' labelPosition='right' onClick={props.handleSignup} style={{ border: '1px black solid' }} />
              {/* <button type='submit' onClick={props.handleLogin}>Submit</button> */}
            </form>
          </div>
        </Tab.Pane>
    }
  ]
  return (
    <Tab panes={panes} menu={{ pointing: true }} style={{ width: '900px', margin: '0 auto' }} />
  )
}
