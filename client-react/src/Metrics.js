import React from 'react'
import IncidentsByDistrict from './graphs/incidentsByDistrict'
import IllnessChart from './graphs/illnessChart'

export default function Metrics () {
  return (
    <div>
      <h1>Dashboard</h1>
      <IncidentsByDistrict />
      <IllnessChart />
    </div>
  )
}
