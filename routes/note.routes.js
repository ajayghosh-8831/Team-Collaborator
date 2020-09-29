module.exports = (app) => {
    const notes = require('../controllers/note.controllers.js');

// Create a new Note
app.post('/team-collaborator/usernotes', notes.create);

app.get('/team-collaborator/notes', notes.findAll);

//Retrieve a single Note with noteId
app.get('/notes/:noteId', notes.findOne);

//Update a Note with noteId
//app.put('/notes/:noteId', notes.update);

//Delete a Note with noteId
app.delete('/team-collaborator/notes/:noteId', notes.delete);

//Update Note Title
app.put('/team-collaborator/updateNotes', notes.updateNotes);

//Share a note
app.post('/team-collaborator/share', notes.share);

// //Get team notes
// app.get('/team-collaborator/teamnotes',notes.find);

}