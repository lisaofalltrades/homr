import React from 'react'
// import { Input, Accordion, Icon, Button, Form, Dropdown } from 'semantic-ui-react'

export default function AppendNotes (props) {
  console.log(props)
  return (
    <div>
      {props.newNotes
        ? <ul className='notesContainer'>
          {props.newNotes.map(element =>
            <li key={element}>
              <div>{element.date}</div>
              <div>{element.category}</div>
              <div>{element.description}</div>
            </li>)}
        </ul>
        : <p>none</p>}
    </div>
  )
}
