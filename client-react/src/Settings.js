import React from 'react'
import { Button, Form, Header } from 'semantic-ui-react'

export default function (props) {
  return (
    <div>
      <Header as='h1'>User Profile</Header>
      <Form id='profileForm'>
        <Form.Field>
          <label>First Name</label>
          <input id='Fname' placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input id='Lname' placeholder='Last Name' />
        </Form.Field>
        <Form.Field >
          <label>Job Title</label>
          <input id='job_title' placeholder='Job Title' />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input id='city' placeholder='City' />
        </Form.Field>
        <Form.Field>
          <label>County</label>
          <input id='county' placeholder='County' />
        </Form.Field>
        {props.role === 'fire_chief'
          ? <Form.Field>
            <label>District</label>
            <input id='district' placeholder='District' />
            <span id='district' value='' />
            </Form.Field>
          : null
        }
        <Button type='submit' 
          content='Update' 
          icon='right arrow' 
          labelPosition='right' 
          onClick={props.handleProfile}
          style={{ border: '1px black solid' }} />
      </Form>
    </div>
  )
}
