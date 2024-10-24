const notes = require('express').Router();

const uuid = require('../helpers/uuid');



app.post('/api/noteRouter', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a new note.`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      // Convert the data to a string so we can save it
      const noteString = JSON.stringify(newNote);
  
      // Write the string to a file
      fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
        err
          ? console.error(err)
          : console.log(
              `Review for ${newNote.title} has been written to JSON file`
            )
      );
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
  });

  module.exports = notes


