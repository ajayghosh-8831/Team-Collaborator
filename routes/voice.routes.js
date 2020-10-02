module.exports = (app) => {
const voice = require('../controllers/voice.controllers.js');

app.post('/share-voice-notes', voice.createVoiceNote);
app.get('/fetch-all-notes/:teamName', voice.getVoiceNotes);

}
