import React from 'react'
import { Grid, Header, Button, Icon, Statistic } from 'semantic-ui-react'

export default class DataBreakdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      districts: []
    }
  }

  componentDidMount () {
    this.props.onhandleGetNotes.bind(this)(this.props.token)
    console.log('notes from databreakdown', this.props.notes)
    const distIncidentCount = {}
    this.props.notes.data.forEach(note => {
      distIncidentCount[note.author.district] = (distIncidentCount[note.author.district] || 0) + 1
    })
    for (const [district, count] of Object.entries(distIncidentCount)) {
      console.log(district, count)
      this.state.districts.push(
        {
          name: district,
          incidentTotal: count
        }
      )
      // this.state.districts.incidentTotal.push(count)
    }
    console.log(this.state)
    this.setState({
      districts: this.state.districts
    })
  }

  render () {
    return (
      <div>
        <Header as='h2'>Incidents by District</Header>
        <Grid columns={2} selection celled='internally' divided>
          {this.state.districts.map((district, i) => {
            console.log(district.name)
            return (
              <Grid.Row key={district}>
                <Grid.Column width={2}>
                  <Statistic size='mini'>
                    <Statistic.Label>District</Statistic.Label>
                    <Statistic.Value>{district.name}</Statistic.Value>
                  </Statistic>
                </Grid.Column>
                <Grid.Column width={14}>
                  <Statistic.Group size='mini' widths='four'>
                    <Statistic>
                      <Statistic.Value>{district.incidentTotal}</Statistic.Value>
                      <Statistic.Label>Incidents Total</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>15</Statistic.Value>
                      <Statistic.Label>Last Month</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>64</Statistic.Value>
                      <Statistic.Label>Last Quarter</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>-12</Statistic.Value>
                      <Statistic.Label>Year Over Year</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                </Grid.Column>
              </Grid.Row>
            )
          }
          )}

          {/* /* { <Grid.Row>
            <Grid.Column width={2}>
              <Statistic size='mini'>
                <Statistic.Label>District</Statistic.Label>
                <Statistic.Value>23</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column width={14}>
              <Statistic.Group size='mini' widths='four'>
                <Statistic>
                  <Statistic.Value>137</Statistic.Value>
                  <Statistic.Label>Incidents Total</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>15</Statistic.Value>
                  <Statistic.Label>Last Month</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>64</Statistic.Value>
                  <Statistic.Label>Last Quarter</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>-12</Statistic.Value>
                  <Statistic.Label>Year Over Year</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
          </Grid.Row> row ends */}
          {/* <Grid.Row>
            <Grid.Column width={2}>
              <Statistic size='mini'>
                <Statistic.Label>District</Statistic.Label>
                <Statistic.Value>45</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column width={14}>
              <Statistic.Group size='mini' widths='four'>
                <Statistic>
                  <Statistic.Value>178</Statistic.Value>
                  <Statistic.Label>Incidents Total</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>40</Statistic.Value>
                  <Statistic.Label>Last Month</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>81</Statistic.Value>
                  <Statistic.Label>Last Quarter</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>+29</Statistic.Value>
                  <Statistic.Label>Year Over Year</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
              <Statistic size='mini'>
                <Statistic.Label>District</Statistic.Label>
                <Statistic.Value>61</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column width={14}>
              <Statistic.Group size='mini' widths='four'>
                <Statistic>
                  <Statistic.Value>83</Statistic.Value>
                  <Statistic.Label>Incidents Total</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>4</Statistic.Value>
                  <Statistic.Label>Last Month</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>25</Statistic.Value>
                  <Statistic.Label>Last Quarter</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>-7</Statistic.Value>
                  <Statistic.Label>Year Over Year</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
          </Grid.Row> */}
        </Grid>
      </div>
    )
  }
}
