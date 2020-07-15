import React from 'react'
import { Pie } from 'react-chartjs-2'
// import { Doughnut } from 'react-chartjs-2'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: this.props.token,
      patients: [],
      labels: [],
      notes: this.props.notes,
      datasets: [
        {
          label: 'Issues',
          backgroundColor: [],
          hoverBackgroundColor: [],
          data: []
        }
      ]
    }
  }

  componentDidMount () {
    fetch('/allPatients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          patients: data.data
        }, () => {
          const illnessDict = {}
          this.state.patients.forEach(patient => {
            // console.log('each note in illnessChart', note.medicalHistory)
            illnessDict[patient.medicalHistory] = (illnessDict[patient.medicalHistory] || 0) + 1
          })

          for (const [illness, count] of Object.entries(illnessDict)) {
            this.state.labels.push(illness)
            const datasets = this.state.datasets[0].data
            datasets.push(count)
          }
        })
      })
      .then(() => {
        this.setState({
          labels: this.state.labels
        })
      })
  }

  getRandomColor (labels) {
    var colorList = []
    var letters = '0123456789ABCDEF'.split('')

    for (var i = 0; i < labels.length; i++) {
      var color = '#'
      for (var j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      colorList.push(color)
    }
    return colorList
  }

  render () {
    const pieState = {
      labels: this.state.labels,
      datasets: [
        {
          label: 'Health Issues',
          backgroundColor: this.getRandomColor.bind(this)(this.state.labels),
          hoverBackgroundColor: this.getRandomColor.bind(this)(this.state.labels),
          data: this.state.datasets[0].data
        }
      ]
    }

    return (
      <div>
        <Pie
          data={pieState}
          options={{
            title: {
              display: true,
              text: 'Health Issues',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>
    )
  }
}
