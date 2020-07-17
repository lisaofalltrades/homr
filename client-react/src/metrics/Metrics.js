import React from 'react'
import Incidents from '../graphs/incidents'
import IllnessChart from '../graphs/illnessChart'

export default class Metrics extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: this.props.token,
      notes: null
    }
  }

  render () {
    return (
      <div>
        <h1>Dashboard</h1>
        <Incidents token={this.state.token} notes={this.state.notes} />
        <IllnessChart token={this.state.token} />
      </div>
    )
  }
}
