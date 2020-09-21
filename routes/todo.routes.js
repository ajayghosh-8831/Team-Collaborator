module.exports = (app) => {
    const todo = require('../controllers/todo.controllers.js');

// Create a new ToDo
app.post('/team-collaborator/usertodo', todo.create);

app.get('/todo', todo.findAll);

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Easy Reminders application. Note Reminders quickly. Organize and keep track of all your Reminders."});
});

//Retrieve a single ToDo with todoId
app.get('/todo/:todoId', todo.findOne);

//Update a ToDo with todoId
//app.put('/todo/:todoId', todo.update);

//Delete a ToDo with todoId
app.delete('/todo/:todoId', todo.delete);

}