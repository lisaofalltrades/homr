import React from 'react'
import { Grid, Header, Button, Icon, Statistic } from 'semantic-ui-react'

export default class DataBreakdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = [{
      districtList: [],
      incidentList: []
    }]
  }

  render () {
    return (
      <div>
        <Header as='h2'>Incidents by District</Header>
        <Grid columns={2} selection celled='internally' divided>
          <Grid.Row>
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
          </Grid.Row>
          <Grid.Row>
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
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
