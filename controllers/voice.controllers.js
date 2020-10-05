const Voice  = require('../models/voice.model.js');
const multer = require('multer');
var fs = require('fs');
 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

var upload = multer({ storage: storage }).single('myAudio')

exports.createVoiceNote = (req, res) => {
        upload(req, res, function (err) {
               if (err instanceof multer.MulterError) {
                   return res.status(500).json(err)
               } else if (err) {
                   return res.status(500).json(err)
               }

                var mp3file = fs.readFileSync(req.file.path);
    
                // Create an Voice instance
                const voice = new Voice({
                type: 'mp3',
                data: mp3file,
                sharedBy: req.body.sharedBy,
                sharedByUserImg: req.body.sharedByUserImg,
                sharedTo: req.body.sharedTo
                });

                voice.save()
                .then(console.log("success fully saved audio"));
          return res.status(200).send(req.file)
        })
};

exports.saveUserVoiceNotes = (req, res) => {
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }

          var mp3file = fs.readFileSync(req.file.path);

          // Create an Voice instance
          const voice = new Voice({
          type: 'mp3',
          data: mp3file,
          sharedBy: req.body.sharedBy,
          sharedByUserImg: req.body.sharedByUserImg,
          });

          voice.save()
          .then(console.log("success fully saved audio"));
    return res.status(200).send(req.file)
  })
};

exports.getVoiceNotes = (req, res) => {
    console.log("fetching voice notesss from DB")
    Voice.find({sharedTo:req.params.teamName})
  .then(voice => {
      res.header('Content-Type', 'audio/mp3');
      res.send(voice);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving user."
      });
  });
};

exports.getUserVoiceNotes = (req, res) => {
  console.log("fetching voice notesss from DB")
  Voice.find({sharedBy:req.params.userName})
.then(voice => {
    res.header('Content-Type', 'audio/mp3');
    res.send(voice);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving user."
    });
});
};