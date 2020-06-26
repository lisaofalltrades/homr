import React from 'react'

export default function Login (props) {
  return (
    <div>
      <h1>Login</h1>
      <form id='loginForm'>
        <input id='email' type='email' placeholder='Email' />
        <br />
        <input id='password' type='password' placeholder='Password' />
        <button type='submit' onClick={props.handleLogin}>Submit</button>
      </form>
    </div>
  )
}
