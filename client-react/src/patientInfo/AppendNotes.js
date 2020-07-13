import React from 'react'
import { Input, Accordion, Icon, Button, Form, Dropdown } from 'semantic-ui-react'

export default function AppendNotes (props) {
  console.log(props)
  return (
    <div>
      {props.newNotes
        ? <ul>
          {props.newNotes.map(element => <li key={element}>{element.description}</li>)}
        </ul>
        : <p>none</p>}
    </div>
  )
}
