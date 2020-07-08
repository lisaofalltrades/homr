import React from 'react'
import { Input, Accordion, Icon, Button, Form, Dropdown } from 'semantic-ui-react'
import AppendNotes from './AppendNotes'

const options = [
  { key: 'i', text: 'Incident', value: 'incident' },
  { key: 'u', text: 'Update', value: 'update' }
]

export default function Notes (props) {
  const [category, setCategory] = React.useState([])

  return (
    <div>
      <h1>Add A Note</h1>
      <Form>
        <Form.Group widths='equal'>
          {/* <Form.Input fluid  placeholder='Date' id='date' /> */}
          <Form.Input label='Date' type='date' />

          <Form.Select
            fluid
            label='Category'
            options={options}
            placeholder='Category'
            // onChange={handleChange}
            onChange={(e, { value }) => { setCategory({ value }) }}
          />
          <Form.Input fluid label='Address' placeholder='Address' id='address' />

        </Form.Group>

        <Form.TextArea fluid label='Description' placeholder='Description' id='description' />
        <Form.Button onClick={props.handleNewNote}>Add Note</Form.Button>
      </Form>

      <AppendNotes />
    </div>
  )
}
