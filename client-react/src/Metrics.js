import React from 'react'
import IncidentsByDistrict from './graphs/incidentsByDistrict'
import IllnessChart from './graphs/illnessChart'

export default class Metrics extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: this.props.token
    }
  }

  render () {
    return (
      <div>
        <h1>Dashboard</h1>
        <IncidentsByDistrict />
        <IllnessChart token={this.state.token} />
      </div>
    )
  }
}
