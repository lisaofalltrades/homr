import React from 'react'
import { Form, Header, Button } from 'semantic-ui-react'

export default class AddTeam extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formFields: [],
      formStore: [],
      counter: 2,
      token: this.props.token
    }
  }

  handleAddField () {
    const idName = 'add' + this.state.counter
    console.log(this.state)
    console.log(this.state.counter)
    this.setState({
      formFields: this.state.formFields.concat(idName),
      counter: (this.state.counter + 1)
    })
  }

  handleFormSubmit () {
    var addTeamForm = document.getElementById('addTeamForm').elements
    const fieldFormArray = []

    for (let i = 0; i < (addTeamForm.length - 2); i++) {
      console.log(addTeamForm[i].value)
      fieldFormArray.push(addTeamForm[i].value)
    }
    this.setState({
      formStore: fieldFormArray
    }, () => {
      fetch('/inviteUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
          forms: this.state.formStore
        })
      })
        .then(response => response.json())
    })
  }

  render () {
    return (
      <div>
        <Header as='h2'>Add Teammates</Header>
        <Form id='addTeamForm' onSubmit={this.handleFormSubmit.bind(this)}>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li><Form.Input fluid id='add1' label='Teammate' placeholder='Email' /></li>
            {this.state.formFields.map(field => {
              return (
                <li key={field}><Form.Input fluid id={field} label='Teammate' placeholder='Email' /></li>
              )
            })}
          </ul>
          <Button type='button' circular color='green' icon='user plus' onClick={this.handleAddField.bind(this)} />
          <Button content='Send Invites' labelPosition='right' icon='right arrow' type='submit' />
        </Form>
      </div>
    )
  }
}
