const User  = require('../models/user.model.js');
const ToDo = require('../models/todo.model.js');

// Create and Save a new To Do Item
exports.create = (req, res) => {
 // Validate request
 if(!req.body.userid) {
    return res.status(400).send({
        message: "Userid cannot be empty"
    });
}
};

exports.findAll = (req, res) => {
    ToDo.find()
  .then(todos => {
    console.log("Fetching all To Do Items");
      res.send(todos);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving to do items."
      });
  });
};

exports.findOne = (req, res) => {
    ToDo.findById(req.params.id)
  .then(todo => {
      if(!todo) {
          return res.status(404).send({
              message: "To Do Item not found with id " + req.params.id
          });            
      }
      res.send(todo);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "To Do Item not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving to do item with id " + req.params.id
      });
  });
};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  
    ToDo.findByIdAndRemove(req.params.id)
  .then(todo => {
      if(!todo) {
          return res.status(404).send({
              message: "To Do Item not found with id " + req.params.id
          });
      }
      res.send({message: "To Do item deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "To Do item not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete To Do item with id " + req.params.id
      });
  });
};