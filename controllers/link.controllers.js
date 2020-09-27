const User  = require('../models/user.model.js');
const Link = require('../models/links.model.js');

// Create and Save a new Link
exports.create = (req, res) => {
 // Validate request
 if(!req.body.userid) {
    return res.status(400).send({
        message: "Userid cannot be empty"
    });
}
};

exports.findAll = (req, res) => {
    Link.find()
  .then(links => {
    console.log("Fetching all links");
      res.send(links);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving links."
      });
  });
};

exports.findOne = (req, res) => {
    Link.findById(req.params.id)
  .then(link => {
      if(!link) {
          return res.status(404).send({
              message: "Link not found with id " + req.params.id
          });            
      }
      res.send(link);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Link not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving link with id " + req.params.id
      });
  });
};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  
    Link.findByIdAndRemove(req.params.id)
  .then(link => {
      if(!link) {
          return res.status(404).send({
              message: "Link not found with id " + req.params.id
          });
      }
      res.send({message: "Link deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Link not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete link with id " + req.params.id
      });
  });
};