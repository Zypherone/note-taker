// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const fs = require('fs')
const { uuid } = require('uuidv4')
const path = require('path')
const db = path.join(__dirname, '/../db/db.json')

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  let notes = []

  const writeToDb = () => {
    fs.writeFile(db, JSON.stringify(notes, 4), err => {
      if (err) console.log(err)
    })
  }

  fs.readFile(db, (err, data) => {
    if (err) console.log(err)
    notes = JSON.parse(data, 4)
  })

  app.get('/api/notes', (req, res) => {
    res.json(notes)
  })

  app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uuid()

    notes.unshift(newNote)

    writeToDb()

    res.json(notes)
  })

  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const deletedData = notes.filter(v => v.id === id)[0]
    notes = notes.filter(v => v.id !== id)

    writeToDb()

    res.json([{ delete: deletedData }])
  })
}
