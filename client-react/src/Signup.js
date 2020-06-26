import React from 'react'

export default function Signup (props) {
  return (
    <div>
      <h1>Signup</h1>
      <form id='signupForm'>
        <input id='email' type='email' placeholder='Email' />
        <br />
        <input id='password' type='password' placeholder='Password' />
        <br />
        <input type='password' placeholder='Confirm Password' />
        <br />
        <select id='roles'>
          <option>-- Select Role --</option>
          <option value='fire_chief'>Fire Chief</option>
          <option value='charity_rep'>Charity Rep</option>
          <option value='city_rep'>City Rep</option>
        </select>
        <br />
        <button type='submit' onClick={props.handleSignup}>Submit</button>
      </form>
    </div>
  )
}
