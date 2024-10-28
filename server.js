const express = require('express');
const path = require('path');
// const routes = require('./routes/noteRoutes');
const noteRoutes = require('./routes/noteRoutes');
const indexRoutes = require('./routes/index');

const app = express();


const api = require('./routes/index');

app.use(express.json());
app.use('/api', noteRoutes)
// app.use('/api', indexRoutes)




const PORT = process.env.PORT || 3001;

// app.use('routes');

app.use(express.static('public'));




app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);







app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
)
