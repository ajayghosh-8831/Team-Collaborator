const User = require('../models/user.model.js');
const Note = require('../models/notes.model.js');
const Team = require('../models/teams.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
 // Validate request
 if(!req.body.userid) {
    return res.status(400).send({
        message: "Userid cannot be empty"
    });
}
else{
    // User.save()
    // .then(data => {
    //     res.send(data);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while creating the User."
    //     });
    // });


    const note = new Note({
        noteTitle: req.body.title,
        noteDesc: req.body.desc
    });
    
    var noteid = note.save( (data , err, next) => {
    var id = data._id;
    return id;
   })
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
    console.log(noteid);
       
    }
};

exports.findAll = (req, res) => {
    Note.find()
  .then(notes => {
    console.log("Fecthing all notes");
      res.send(notes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes."
      });
  });
};

exports.findOne = (req, res) => {
    Note.findById(req.params.id)
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "Note not found with id " + req.params.id
          });            
      }
      res.send(note);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Note not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving note with id " + req.params.id
      });
  });
};

exports.updateNotes = (req,res) => {
    Note.findByIdAndUpdate(req.body.id,{
        noteTitle : req.body.title,
        noteDesc : req.body.desc
    },{new : true})
        .then(note => {
            res.send(note);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.id
            });
        });
    };

exports.share = (req,res) => {
    Note.findByIdAndUpdate(req.body.id,{
        isShared:true,
        sharedWith:req.body.name},{new : true})
        .then(note => {
            res.send(note);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.id
            });
        });

    Team.findByIdAndUpdate(req.body.name,{
        notes:req.body.id},{new : true})
        .then(team => {
            res.send(team);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });                
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
}
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  
    Note.findByIdAndRemove(req.params.id)
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "Note not found with id " + req.params.id
          });
      }
      res.send({message: "Note deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Note not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete note with id " + req.params.id
      });
  });
};
