module.exports = (app) => {
    const todoController = require('../controllers/todo.controllers.js');

    app.get('/fetch-user-todos/:userId', todoController.getUserToDos);

    app.post('/create-todo', todoController.create);

    app.post('/edit-todo', todoController.edit);

    app.get('/todo/:todoId', todoController.findOne);

    app.delete('/todo/:todoId', todoController.delete);

    app.get('/', (req, res) => {
        res.json(
            {
                "message": "Welcome to Easy Reminders application. Note Reminders quickly. Organize and keep track of all your Reminders."
            }
        );
    });

}