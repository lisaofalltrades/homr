import React from 'react'
import { Input, Accordion, Icon, Button, Form, Dropdown } from 'semantic-ui-react'
import AppendNotes from './AppendNotes'

class Notes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      category: '',
      address: '',
      description: '',
      token: props.token,
      options: [
        { key: 'i', text: 'Incident', value: 'incident' },
        { key: 'u', text: 'Update', value: 'update' }
      ]
    }
  }

  handleonChange (e, data) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCategoryChange (evt, data) {
    this.setState({
      category: data.value
    })
  }

  handleNewNote () {
    console.log('Adding a new note')
    console.log('info', this.state.date, this.state.category, this.state.address, this.state.description, this.state.token)

    fetch('/AddNote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        category: this.state.category,
        date: this.state.date,
        address: this.state.address,
        description: this.state.description
      })
    })
      .then(response => response.json())
  }

  render () {
    const {
      date,
      address,
      description
    } = this.state
    return (
      <div>
        <h1>Add A Note</h1>
        <Form>
          <Form.Group widths='equal'>
            {/* <Form.Input fluid  placeholder='Date' id='date' /> */}
            <Form.Input
              label='Date'
              type='date'
              id='date'
              name='date'
              value={date}
              onChange={this.handleonChange.bind(this)}
            />

            <Form.Select
              fluid
              label='Category'
              options={this.state.options}
              placeholder='Category'
              id='category'
              onChange={this.handleCategoryChange.bind(this)}
            />
            <Form.Input
              fluid label='Address'
              placeholder='Address'
              id='address'
              name='address'
              value={address}
              onChange={this.handleonChange.bind(this)}
            />

          </Form.Group>

          <Form.TextArea
            fluid label='Description' placeholder='Description'
            id='description'
            name='description'
            value={description}
            onChange={this.handleonChange.bind(this)}
          />

          <Form.Button
            onClick={this.handleNewNote.bind(this)}
          >
            Add Note
          </Form.Button>
        </Form>

        <AppendNotes />
      </div>
    )
  }
}

export default Notes

// export default function Notes (props) {
//   const [category, setCategory] = React.useState([])
//   console.log(category)
//   return (
//     <div>
//       <h1>Add A Note</h1>
//       <Form>
//         <Form.Group widths='equal'>
//           {/* <Form.Input fluid  placeholder='Date' id='date' /> */}
//           <Form.Input label='Date' type='date' />

//           <Form.Select
//             fluid
//             label='Category'
//             options={options}
//             placeholder='Category'
//             // onChange={handleChange}
//             onChange={(e, { value }) => { setCategory({ value }) }}
//           />
//           <Form.Input fluid label='Address' placeholder='Address' id='address' />

//         </Form.Group>

//         <Form.TextArea fluid label='Description' placeholder='Description' id='description' />
//         <Form.Button onClick={props.handleNewNote}>Add Note</Form.Button>
//       </Form>

//       <AppendNotes />
//     </div>
//   )
// }
