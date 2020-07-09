import React from 'react'
import { Search, Grid, Header, Segment, Divider, Icon, Button } from 'semantic-ui-react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

const initialState = { isLoading: false, results: [], value: ''}

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
    // add functionality to handleResultSelect to setState and then take the value added and pass function to Patient Profile and then setState to change the active Tab index to Patient Profile
  
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
          console.log(data.data[0].user, 'this is the ObjectID of the patient')

          
          data.data.forEach(el => console.log("EACH DATA", el.firstName) )
          
          
          data.data.forEach(el => sourceArray.push({
            title: el.lastName,
            description: el.firstName 
          }))
          
          sourceArray[sourceArray.length] = {title: <Link to='addPatient'>Add New</Link>}
          
          console.log("SOURCE ARRAY line 67", sourceArray)

          this.setState({
            results: sourceArray
          })
          
        }, console.log(this.state.results, 'this is results'))
  
      setTimeout(() => {
        if (this.state.value.length < 1) return this.setState(initialState)
  
        // const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        // const isMatch = (result) => re.test(result.title)
  
        this.setState({
          isLoading: false,
          // results: _.filter(this.state.results, isMatch),
        })
      }, 300)
    }
  
    render() {
      const { isLoading, value, results } = this.state
  
      return (
        <div>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            fluid
            size='huge'
            results={results}
            value={value}
            {...this.props}
          />
        </div>
      )
    }
  }