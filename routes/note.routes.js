module.exports = (app) => {
    const notes = require('../controllers/note.controllers.js');

// Create a new Note
app.post('/create-note', notes.createNewNote);

app.get('/notes', notes.findAll);

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

//Retrieve a single Note with noteId
app.get('/notes/:noteId', notes.findOne);

//Update a Note with noteId
//app.put('/notes/:noteId', notes.update);

//Delete a Note with noteId
app.delete('/notes/:noteId', notes.delete);

}