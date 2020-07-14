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
      datasets: [
        {
          label: 'Issues',
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4'
          ],
          hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F'
          ],
          data: []
        }
      ]
    }
  }

  componentDidMount () {
    // console.log('fetching all patients for illness chart')
    fetch('/allPatients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log('res data', data)
        this.setState({
          patients: data.data
        }, () => {
          const illnessDict = {}
          this.state.patients.forEach(note => {
            // console.log('each note in illnessChart', note.medicalHistory)
            illnessDict[note.medicalHistory] = (illnessDict[note.medicalHistory] || 0) + 1
          })

          for (const [illness, count] of Object.entries(illnessDict)) {
            this.state.labels.push(illness)
            const datasets = this.state.datasets[0].data
            datasets.push(count)
          }
          // console.log('state after illnessDict', this.state)
        })
      })
  }

  getRandomColor (labels) {
    var colorList = []
    var letters = '0123456789ABCDEF'.split('')

    for (var i = 0; i < labels; i++) {
      var color = '#'
      for (var j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      colorList.push(color)
    }
    // console.log(colorList)
    return colorList
  }

  render () {
    const state = {
      labels: this.state.labels,
      datasets: [
        {
          label: 'Issues',
          backgroundColor: this.getRandomColor(this.state.labels.length),
          hoverBackgroundColor: this.getRandomColor(this.state.labels.length),
          data: this.state.datasets[0].data
        }
      ]
    }
    return (
      <div>
        <Pie
          data={state}
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
