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
    const note = new Note({
        noteTitle: req.body.title,
        noteDesc: req.body.desc
    });
    note.save()
    .then(data => {
        const user = new Note({
            userid : req.body.userid,
            notes : [data._id]
        });
        user.save()
        .then(info => {
            res.send(info);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
        });
    });
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    }); 
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

exports.findnotes = (req,res) => {
    Note.find(req.params.userid)
    .then(note => {
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User id not found " + req.params.userid
            });                
        }
        return res.status(500).send({
            message: "Some error occurred while retrieving notes" + req.params.userid
        });
    });
}

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
