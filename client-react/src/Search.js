import React from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import _ from 'lodash'

const initialState = { isLoading: false, results: [], value: ''}

// const source = _.times(5, () => ({
//   title: this.state.results.title,
//   // otherInfo: faker.company.catchPhrase(),
//   // image: faker.internet.avatar()
// }))

export default class PatientSearch extends React.Component {

    state = initialState

    // componentDidMount() {
    //   fetch('/allPatients', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${this.state.token}`
    //     },
    //     body: JSON.stringify({
    //       photoID: this.state.basicInfo.photoID,
    //       firstName: this.state.basicInfo.firstName,
    //       lastName: this.state.basicInfo.lastName,
    //       dob: this.state.basicInfo.dob,
    //       birthPlace: this.state.basicInfo.birthPlace,
    //       licenseNum: this.state.basicInfo.licenseNum,
    //       race: this.state.basicInfo.race,
    //       medicalHistory: this.state.medicalHistory,
    //       notes: null,
    //       redFlags: null
    //     })
    //   })
    //     .then(response => response.json())
    // }
  
    handleResultSelect = (e, { result }) => this.setState({ value: result.title })
  
    handleSearchChange = (e, { value }) => {
      this.setState({ isLoading: true, value })

      fetch('/patientSearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.token}`
        },
        body: JSON.stringify({
          searchValue: value
        })
      })
        .then(response => response.json())
        .then(data => {
          // const resultsArray = []
          // resultsArray.push(data)
          console.log("DATA.DATA", data.data)

          let sourceArray = []
          
          data.data.forEach(el => console.log("EACH DATA", el.firstName) )

          data.data.forEach(el => sourceArray.push({
            title: el.firstName,
            description: el.lastName }))

          console.log("SOURCE ARRAY line 67", sourceArray)

          // data.data.forEach(el => {
          //   source.concat({
          //     title: el.lastName,
          //     description: el.firstName
          //   })
          //   console.log(source)
          // })

          // try {
            // source = _.times(1, () => ({
            //   title: data.data[0].lastName,
            //   description: data.data[0].firstName
            // }))
          // }
          // catch {
          //   source = 'No results found.'
          // }


          this.setState({
            results: sourceArray
          })
          
        }, console.log(this.state.results, 'this is results'))
  
      setTimeout(() => {
        if (this.state.value.length < 1) return this.setState(initialState)
  
        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = (result) => re.test(result.title)
  
        this.setState({
          isLoading: false,
          // results: _.filter(this.state.results, isMatch),
        })
      }, 300)
    }
  
    render() {
      const { isLoading, value, results } = this.state
  
      return (
        <Grid>
          <Grid.Column width={6}>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
              {...this.props}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>
              <Header>State</Header>
              <pre style={{ overflowX: 'auto' }}>
                {JSON.stringify(this.state, null, 2)}
              </pre>
              <Header>Options</Header>
              <pre style={{ overflowX: 'auto' }}>
                {JSON.stringify(this.state.results, null, 2)}
              </pre>
            </Segment>
          </Grid.Column>
        </Grid>
      )
    }
  }