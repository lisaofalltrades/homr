import React from 'react'
import Notes from './Notes.js'
import PatientInfo from '../Patients.js'

function handleNewNote (evt) {
  evt.preventDefault()
  const date = document.getElementById('date').value
  const category = document.getElementById('category')
  const address = document.getElementById('address').value
  const description = document.getElementById('description').value
  console.log('Adding a new note')
  console.log('info', date, category, address, description)
}
// 7/7/2020 Need to pass in props from App.js
export default function Metrics () {
  return (
    <div class='patientView'>
      <section class='patientInfo'>
        <h1>A Patient</h1>
        <PatientInfo />
      </section>
      <section class='patientInfo'>
        {/* pass notes the token from props */}
        <Notes handleNewNote={handleNewNote} />
      </section>

    </div>
  )
}
