import React from 'react'
// import PatientProfile from '../PatientProfile'
import { Form } from 'semantic-ui-react'
import AppendNotes from './AppendNotes'
import secret from '../secrets'
import Geocode from 'react-geocode'

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
      redFlags: [],
      cords: null,
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
    // Geocode.setApiKey(secret.key)
    // Geocode.fromAddress(this.state.address).then(
    //   response => {
    //     let location = response.results[0].geometry.location
    //     console.log(location)
    //     this.setState({ cords: location })
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
  }

  handleaddress (e, data) {
    this.setState({ [e.target.name]: e.target.value })
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY || secret.key)
    // Geocode.setApiKey(secret.key)
    Geocode.fromAddress(e.target.value).then(
      response => {
        const location = response.results[0].geometry.location
        console.log(location)
        this.setState({ cords: location })
      },
      error => {
        console.log(error)
      }
    )
  }

  handleRedFlag (e, data) {
    let redFlags = document.getElementById('redFlags').value
    console.log(redFlags, 'this is a red flag')
    this.setState({ redFlags: this.state.redFlags.concat(redFlags) }, () => {
      console.log(this.state, 'this is state after red flags')
    })
    redFlags = ''
  }

  handleCategoryChange (evt, data) {
    this.setState({
      category: data.value
    })
  }

  handleNewNote () {
    // const redFlags = document.getElementById('redFlags')
    console.log('Adding a new note')
    console.log('info', this.state.date, this.state.category, this.state.address, this.state.description, this.state.token, this.state.patient._id, this.state.patient.user, this.state.redFlags)

    // Geocode.setApiKey(secret.key)
    // Geocode.fromAddress(this.state.address).then(
    //   response => {
    //     let location = response.results[0].geometry.location
    //     console.log(location)
    //     this.setState({ cords: location })
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
    // this.setState({ redFlags: this.state.redFlags.concat(redFlags) }, () => ())
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
        author: this.state.patient.user,
        redFlags: this.state.redFlags,
        cords: this.state.cords
        // above is a work in progress
      })
    })
      .then(response => response.json())
      .then(data => { this.setState({ notes: data.notes, redFlags: data.redFlags }, () => { this.props.onhandleRedFlagUpdate(this.state.redFlags) }) })
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
              onChange={this.handleaddress.bind(this)}
            />

          </Form.Group>

          <Form.TextArea
            fluid label='Description' placeholder='Description'
            id='description'
            name='description'
            value={description}
            onChange={this.handleonChange.bind(this)}
          />

          <Form.Input
            fluid label='RedFlags'
            placeholder='RedFlags, leave blank if not applicable'
            id='redFlags'
            name='redFlags'
          />
          <Form.Button
            onClick={this.handleRedFlag.bind(this)}
          >
            Add Red Flag
          </Form.Button>

          <Form.Button
            // onClick={this.handleNewNote.bind(this)}
            // onClick={() => { this.handleNewNote.bind(this); this.props.onhandleUpdateState() }}
            onClick={() => { this.handleNewNote.bind(this)(); this.props.onhandleUpdateState(); this.props.onhandleRedFlagUpdate() }}
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
