import React from 'react'

export default function (props) {
  return (
    <div>
      <h1>Settings</h1>
      <form id='profileForm'>
        <input id='Fname' type='text' placeholder='First Name' /> <br />
        <input id='Lname' type='text' placeholder='Last Name' /> <br />
        <input id='job_title' type='text' placeholder='Job Title' /> <br />
        <input id='city' type='text' placeholder='City' /> <br />
        <input id='county' type='text' placeholder='County' /> <br />
        {props.role === 'fire_chief' ? <input id='district' type='text' placeholder='District' /> : null}
        <br />
        <button type='submit' onClick={props.handleSignup}>Update</button>
      </form>
    </div>
  )
}
