// for notes
router.post('/notes', [authenticate], (req, res) => {
  // query all notes where category = incident
  Note.find({ category: 'Incident' }, async (err, data) => {
    if (err) return res.status(500).send(err)
    if (data) {
      res.send({
        data
      })
    } else {
      res.send(console.log('No results found'))
    }
  })
})

// for notes
// helpers here
// move this componentDidMount to Incidents
componentDidMount() {
  fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.state.token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // console.log('Data res from Metrics', data)
      this.setState({
        notes: data.data
      }, () => {
        this.state.notes.sort(function (note) {
          if (note.category === 'incident') { return note }
          // console.log(note)
        })
      })
    })
}
