import React from 'react'
import { Bar } from 'react-chartjs-2'

const state = {
  labels: ['D1', 'D2', 'D3',
    'D4', 'D5'],
  datasets: [
    {
      label: 'Incidents',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [10, 20, 30, 40, 50]
    }
  ]
}

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: 'Incidents per District',
              fontSize: 20
            },
            legend: {
              display: false,
              position: 'right'
            }
          }}
        />
      </div>
    )
  }
}
