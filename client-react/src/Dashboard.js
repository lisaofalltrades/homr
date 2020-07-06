import React from 'react'
import { Input, Button, Header, Tab, Dropdown } from 'semantic-ui-react'
import Map from './Map'
import Metrics from './Metrics'

export default function Dashboard (props) {
  const panes = [
    {
      menuItem: 'Dashboard',
      render: () =>
        <Tab.Pane attached={false}>
          <div style={{ 'text-align': 'center' }}>
            <Metrics />
          </div>
        </Tab.Pane>
    },
    {
      menuItem: 'Map',
      render: () =>
        <Tab.Pane attached={false}>
          <div style={{ 'text-align': 'center' }}>
            <Map />
          </div>
        </Tab.Pane>
    }
  ]
  return (
    <Tab panes={panes} menu={{ pointing: true }} style={{ width: '900px', margin: '0 auto' }} />
  )
}
