const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');


notes.post('/noteRouter', (req, res) => {
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

      const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();

  
      // Convert the data to a string so we can save it
      const noteString = JSON.stringify(newNote, null, 2);
  
      // Write the string to a file
      fs.writeFile(path.join(__dirname, `../db/${sanitizedTitle}.json`), noteString, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).json('Error in writing note');
        } else {
            console.log(`Review for ${newNote.title} has been written to JSON file`);
            res.status(201).json({
                status: 'success',
                body: newNote,
            });
        }
    });

} else {
    console.error('Missing title or text');
    res.status(500).json('Error in posting note');
}
});
  
 

  module.exports = notes;


