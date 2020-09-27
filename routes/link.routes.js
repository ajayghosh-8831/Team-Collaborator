module.exports = (app) => {
    const links = require('../controllers/link.controllers.js');

// Create a new Note
app.post('/team-collaborator/userlinks', links.create);

app.get('/links', links.findAll);

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyLinks application. Note links quickly. Organize and keep track of all your links."});
});

//Retrieve a single Note with noteId
app.get('/links/:linkId', links.findOne);

//Update a Link with linkId
//app.put('/notes/:noteId', links.update);

//Delete a Note with noteId
app.delete('/links/:linkId', links.delete);

}