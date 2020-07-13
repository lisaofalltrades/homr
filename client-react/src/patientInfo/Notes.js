import React from 'react'
// import PatientProfile from '../PatientProfile'
import { Form } from 'semantic-ui-react'
import AppendNotes from './AppendNotes'

class Notes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      category: '',
      address: '',
      description: '',
      patient: props.patientId,
      token: props.token,
      notes: [],
      options: [
        { key: 'i', text: 'Incident', value: 'incident' },
        { key: 'u', text: 'Update', value: 'update' }
      ]
    }
  }

  // onHandleNoteChange () {
  //   return (<PatientProfile newNotes={this.state.notes} />)
  // }

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
    console.log('info', this.state.date, this.state.category, this.state.address, this.state.description, this.state.token, this.state.patient._id, this.state.patient.user)
    // need to get the patient from the other component in order to align with that patient
    fetch('/AddNote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`
      },
      body: JSON.stringify({
        category: this.state.category,
        date: this.state.date,
        address: this.state.address,
        description: this.state.description,
        patient: this.state.patient._id,
        author: this.state.patient.user
        // above is a work in progress
      })
    })
      .then(response => response.json())
      .then(data => { this.setState({ notes: data.notes }, () => console.log(this.state, 'this is the data on return')) })
      // this is where we ended on friday 7/10
  }

  render () {
    const {
      date,
      address,
      description
    } = this.state
    return (
      <div>
        <AppendNotes newNotes={this.state.notes} />
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
            // onClick={this.handleNewNote.bind(this)}
            // onClick={() => { this.handleNewNote.bind(this); this.props.onhandleUpdateState() }}
            onClick={() => { this.handleNewNote.bind(this)(); this.props.onhandleUpdateState() }}
          >
            Add Note
          </Form.Button>
        </Form>
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
