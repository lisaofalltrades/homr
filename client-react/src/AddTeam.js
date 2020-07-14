import React from 'react'
import { Form, Header, Button, Dropdown } from 'semantic-ui-react'

export default class AddTeam extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formFields: [],
      counter: 0
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

  render () {
    return (
      <div>
        <Header as='h2'>Add Teammates</Header>
        <Form>
          {/* <Form.Input fluid id='add1' label='Teammate' placeholder='Email' /><br /> */}
          {this.state.formFields.map(field => {
            return (
              <ul style={{ listStyleType: 'none' }}>
                <li><Form.Input fluid key={field} id={field} label='Teammate' placeholder='Email' /></li>
              </ul>
            )
          })}
          <Button circular color='green' icon='user plus' onClick={this.handleAddField.bind(this)} />

        </Form>
      </div>
    )
  }
}
