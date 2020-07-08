import React from 'react'
import Notes from './Notes.js'
import PatientInfo from '../Patients.js'


// 7/7/2020 Need to pass in props from App.js
export default function Metrics (props) {
  return (
    <div class='patientView'>
      <section class='patientInfo'>
        <h1>A Patient</h1>
        <PatientInfo />
      </section>
      <section class='patientInfo'>
        {/* pass notes the token from props */}
        {/* <Notes handleNewNote={handleNewNote} /> */}
        <Notes token={props.token} />
      </section>

    </div>
  )
}
