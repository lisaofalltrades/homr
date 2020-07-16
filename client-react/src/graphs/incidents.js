import React from 'react'
import { Bar } from 'react-chartjs-2'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: this.props.token,
      labels: [],
      // notes: null,
      datasets: [
        {
          label: 'Incidents',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          hoverBackgroundColor: [],
          data: []
        }
      ]
    }
  }

  componentDidMount () {
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const distIncidentCount = {}

        data.data.forEach(note => {
          distIncidentCount[note.author.district] = (distIncidentCount[note.author.district] || 0) + 1
        })

        for (const [district, count] of Object.entries(distIncidentCount)) {
          this.state.labels.push(district)
          const datasets = this.state.datasets[0].data
          datasets.push(count)
        }
      })
      .then(() => {
        this.setState({
          labels: this.state.labels,
          data: this.state.data
        })
      })
  }

  render () {
    const datasets = this.state.datasets[0]
    const barState = {
      labels: this.state.labels,
      datasets: [
        {
          label: 'Incidents',
          backgroundColor: datasets.backgroundColor,
          borderColor: datasets.borderColor,
          borderWidth: datasets.borderWidth,
          data: datasets.data
        }
      ]
    }

    return (
      <div>
        <Bar
          data={barState}
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
