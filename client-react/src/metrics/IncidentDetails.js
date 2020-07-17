import React from 'react'
import { Header, List, Icon, Button } from 'semantic-ui-react'

export default class ViewDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: this.props.token,
      notes: []
    }
  }

  componentDidMount () {
    console.log(this.props.notes, 'props.notes')
    console.log(this.props.notes.data, 'props.notes.data')
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          notes: data.data
        }, () => { console.log(this.state, 'line 27') })
      })
    // this.setState({
    //   notes: Object.entries(this.props.notes)
    // }, console.log(typeof this.state.notes))
    // for (let i = 0; i < 5; i++) {
    //   this.state.notes.push(Object.entries(this.props.notes[i]))
    //   console.log(this.state.notes, 'After the loop')
    // }
  }

  // list 15 most recent notes
  // Date:
  // Author:
  // Patient Info (first and last name)
  // Location/address
  // note content
  render () {
    console.log(this.state.notes)
    return (
      <div>
        <h1>Dashboard</h1>
        {this.state.notes.map(element =>
          <div key={element} id='viewPatientInfo' style={{ display: 'block' }}>
            <div>
              <List>
                <List.Item>
                  <List.Content>
                    <List.Header>Date of Incident</List.Header>
                    <List.Description>
                      {element.date}
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Author</List.Header>
                    <List.Description>
                      {element.author.firstName} {element.author.lastName}
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Patient</List.Header>
                    <List.Description> hi
                      {/* {element.patient.firstName} {element.patient.lastName} */}
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Location</List.Header>
                    <List.Description>
                      {element.address}
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Description</List.Header>
                    <List.Description>
                      {element.description}
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
              <hr />
            </div>
          </div>
        )}
      </div>
    )
  }
}
