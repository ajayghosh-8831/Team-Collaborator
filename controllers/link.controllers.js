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

exports.createNewLink = (req, res) => {
    console.log("Creating the shared links in DB")

    console.log("Creating links model")
    // Create a Link
    const link = new Link({
        linkTitle: req.body.linkTitle || "Untitled Note", 
        linkUrl: req.body.linkUrl,
        isShared : req.body.isShared,
        sharedWith : req.body.teamName,
        sharedBy : req.body.userId,
        sharedByUserImg : req.body.userImg
    });

    console.log("Created model")
    console.log(link)
    // Save Note in the database
    link.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Link."
        });
    });
};

exports.findAll = async (req, res) => {
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


// Delete a link with the specified linkId in the request
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