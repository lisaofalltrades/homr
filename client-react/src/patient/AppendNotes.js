import React from 'react'
// import { Input, Accordion, Icon, Button, Form, Dropdown } from 'semantic-ui-react'

export default function AppendNotes (props) {
  console.log(props)
  return (
    <div>
      {props.newNotes.length > 0
        ? <table class='ui table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.newNotes.map(element =>
              <tr>
                <th>{element.date}</th>
                <th>{element.category}</th>
                <th>{element.description}</th>
              </tr>)}

          </tbody>
        </table>
        : null}
    </div>
  )
}
