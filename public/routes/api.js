// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources. 
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const fs = require("fs");
const { uuid } = require('uuidv4');
const path = require('path');




// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  /*fetch = (res, type = '') => {
    if (type === 'delete') {
      
      readFileAsync(path.join(__dirname + '/../db/db.json'))
      .then(r => {
        //console.log(JSON.parse(data, 4));
        return JSON.parse(r, 4);
      })
      .catch(e => {
        console.log(e)
      }) 
    }
    else {
      fs.readFile(path.join(__dirname + '/../db/db.json'), function(err, data) {
        return res.json(JSON.parse(data, 4));
      });
    }
  }


*/

  let notes = [];

  fs.readFile(path.join(__dirname + '/../db/db.json'), function(err, data) {
    notes = JSON.parse(data, 4);
  });
  //let notes = fetch();

  app.get('/api/notes', async function(req, res) {
    res.json(notes);
  });

  app.post('/api/notes', function(req, res) {

    //const { title, text } = req.post;

    //console.log(req.params);

    let newNote = req.body;
        newNote.id = uuid();

    notes.unshift(newNote)

    res.json(notes);

  });

  app.delete('/api/notes/:id', function(req, res) {

    const id = req.params.id;
    const deletedData = notes.filter(v => v.id === id)[0];
    notes = notes.filter(v => v.id !== id);
  
    res.json([{ 'delete': deletedData }]);

    


  });

}