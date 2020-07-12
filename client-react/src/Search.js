import React from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import { Link, Redirect } from 'react-router-dom'
import PatientProfile from './PatientProfile'

const initialState = { isLoading: false, results: [], value: '', patientId: [], selectedPatient: '',token: ''}

export default class PatientSearch extends React.Component {

    state = initialState

    componentDidMount () {
      // added by austen 7/10
      this.setState({ token: this.props.token})
    }
  
    handleResultSelect = (e, { result }) => {
      console.log(this.state.results.indexOf(result), 'this is the result')
      // this is the patient id of the selected patient
      let selectedId = this.state.patientId[this.state.results.indexOf(result)]
      console.log(selectedId, 'this is the selected id')
      this.setState({ value: result.title, selectedPatient: selectedId}, () => {
        this.props.onhandlePatientSelect(this.state.selectedPatient)
      })
    }

  
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
          let idArray = []
          console.log(data.data[0].user, 'this is the ObjectID of the patient')
          
          
          data.data.forEach(el => console.log("EACH DATA", el.firstName) )
          
          
          data.data.forEach(el => {
            idArray.push({
              // id: el._id
              id:el
            })
            sourceArray.push({
              title: el.lastName,
              description: el.firstName 
            })})
            
            // console.log(el, 'this is el')
          sourceArray[sourceArray.length] = {title: <Link to='addPatient'>Add New</Link>}
          
          console.log("SOURCE ARRAY line 67", sourceArray)

          this.setState({
            results: sourceArray,
            patientId: idArray
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
      const { isLoading, value, results, activeIndex } = this.state
    
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
              // and down is added by austen 7/10
              active={activeIndex === 0}
              index={0}
            />
        </div>
      )
    }
  }
  {/* <div>
    <PatientProfile 
        active={activeIndex === 1}
        index={1}
        selectedPatient={this.state.selectedPatient}
        token={this.props.token}
    />
  </div>
  } */}