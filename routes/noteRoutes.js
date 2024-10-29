const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');


notes.post('/noteRouter', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a new note.`);
    console.log('Request body:', req.body)
   

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

notes.get('/noteRouter', (req, res) => {
    const dbPath = path.join(__dirname, '../db');
    console.log('Reading directory:', dbPath);
    fs.readdir(dbPath, (err, files) => {
        if (err) {
            console.error('Error reading files:', err);
            return res.status(500).json('Error in fetching notes');
        }
        console.log('Files found:', files);
        const notes = files.map(file => {
            const filePath = path.join(dbPath, file);
            console.log('Reading file:', filePath);
            const note = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(note);
        });
        res.json(notes);
    });
});

notes.delete('/noteRouter/:id', (req, res) => {
    const noteId = req.params.id;
    const dbPath = path.join(__dirname, '../db');
  
    // Read the directory to find the note file
    fs.readdir(dbPath, (err, files) => {
      if (err) {
        console.error('Error reading files:', err);
        return res.status(500).json('Error in deleting note');
      }
  
      // Find the matching note file
      const noteFile = files.find(file => {
        const note = JSON.parse(fs.readFileSync(path.join(dbPath, file), 'utf8'));
        return note.note_id === noteId;
      });
  
      if (noteFile) {
        // Delete the note file
        fs.unlink(path.join(dbPath, noteFile), err => {
          if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).json('Error in deleting note');
          }
          res.status(200).json(`Note with id ${noteId} has been deleted`);
        });
      } else {
        res.status(404).json(`Note with id ${noteId} not found`);
      }
    });
  });
  
 

  module.exports = notes;


