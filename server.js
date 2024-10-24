const express = require('express');
const path = require('path');
const routes = require('./routes/homeRoutes');

const app = express();


const PORT = 3001;

// app.use('routes');

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);







app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
)
