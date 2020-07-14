import React from 'react'
// import { Input, Accordion, Icon, Button, Form, Dropdown } from 'semantic-ui-react'

export default function AppendRedFlags (props) {
  console.log(props)
  return (
    <div>
      {this.props.selectedPatient.id.redFlags
        ? <ul>
          {this.props.selectedPatient.id.redFlags.map(element => <li key={element}>{element}</li>)}
        </ul> : <p>None</p>}
    </div>
  )
}
