const User  = require('../models/user.model.js');
const Note = require('../models/notes.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
 // Validate request
 if(!req.body.userid) {
    return res.status(400).send({
        message: "Userid cannot be empty"
    });
}
};

exports.createNewNote = (req, res) => {
    console.log("Creating the shared notes in DB")

    console.log("Creating notes model")
    // Create a Note
    const note = new Note({
        noteTitle: req.body.noteTitle || "Untitled Note", 
        noteDesc: req.body.noteDesc,
        isShared : req.body.isShared,
        sharedWith : req.body.teamName,
        sharedBy : req.body.userId,
        sharedByUserImg : req.body.userImg
    });

    console.log("Created model")
    console.log(note)
    // Save Note in the database

    Note.exists({noteTitle: req.body.noteTitle}, function (err, res){
        console.log("exists"+res)
        if(!res){
          console.log("Audio not found so inserting")
          note.save();
        }else{
          console.log("Audio found so updating")
          Note.updateOne(
            { noteTitle: req.body.noteTitle },
            { sharedBy: req.body.userId, 
                sharedWith: req.body.teamName,
                sharedByUserImg: req.body.userImg,
                isShared : req.body.isShared},
            function (err, doc){
              if(err){
                console.log("Updating sharedBy failed");
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
              }
            });
        }
      })
};

exports.createNewUserNote = (req, res) => {
    console.log("Creating the shared notes in DB")

    console.log("Creating notes model")
    // Create a Note
    const note = new Note({
        noteTitle: req.body.noteTitle || "Untitled Note", 
        noteDesc: req.body.noteDesc,
        isShared : req.body.isShared,
        createdBy : req.body.userId,
    });

    console.log("Created model")
    console.log(note)
    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};


exports.findAll = async (req, res) => {
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

exports.getUserNotes = (req, res) => {
    console.log("fetching user notesss from DB")
    Note.find({createdBy:req.params.userId})
  .then(notes => {
      res.send(notes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving user."
      });
  });
  };

  exports.getTeamNotes = (req, res) => {
    console.log("fetching team notes from DB")
    Note.find({sharedWith:req.params.teamName})
  .then(notes => {
      res.send(notes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving user."
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