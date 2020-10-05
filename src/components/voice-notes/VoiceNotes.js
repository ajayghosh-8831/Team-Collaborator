import React, { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import shortid from "shortid";
import  store  from "../../store"
import { faShareAlt, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const recorder = new MicRecorder({
  bitRate: 128
});

const VoiceNotes = () => {

    const [buttonText, setButtonText] = useState('Start recording');
    const [buttonClass, setButtonClass] = useState('btn btn-primary');
    const [shareIcon, setShareIcon] = useState(faShareAlt);
    const [audioElements, setAudioElements] = useState([]);

    function startRecording() {
      recorder.start().then(() => {
        setButtonText('Stop recording');
        setButtonClass('btn btn-primary btn-danger');
      }).catch((e) => {
        console.error(e);
      });
    }

    function stopRecording() {
      recorder.stop().getMp3().then(([buffer, blob]) => {
        let file = new File(buffer, 'music.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });
        console.log("voice personal");
        console.log(buffer);
        setAudioElements(audioElements => audioElements.concat(URL.createObjectURL(file)))
        setButtonText('Start recording');
        setButtonClass('btn btn-primary');
      }).catch((e) => {
        console.error(e);
      });
    }

    function clickHandler(){
      if(buttonText === "Start recording"){
        startRecording();
      } else if (buttonText === "Stop recording"){
        stopRecording();
      }
    }

    async function shareCard (audio) {
      if(shareIcon !== faCheckCircle){
        let blob = await fetch(audio.audio).then(r => r.blob());
        var formData = new FormData();
        formData.append('myAudio', blob);
        formData.append('sharedBy', store.getState().userProfile.userProf.name);
        formData.append('sharedByUserImg', store.getState().userProfile.userProf.imageUrl);
        //Later we have to fetch the team neam probably have to used redux to store user's team
        formData.append('sharedTo', "Expedia");
  
  
        fetch('/share-voice-notes', {
          method: "POST", body: formData
          }).then(response => response.json())
          .then(success => {
            alert("saved successfully");
          })
          .catch(error => {console.log(error); alert("failed")}
        );
      }
    };
  
    
    return (
      <div className="container text-center" style={{marginTop:"2%"}}>
      <button id="recordBtn" className={buttonClass} onClick={() => clickHandler()}>{buttonText}</button>
        <div>
              <div id="outerDiv" className="work-div">
              {audioElements.map(audio => 
              <div className="card work-card" id={shortid.generate()}>
                  <audio preload="auto" controls style={{width: '50%'}}>
                    <source src={audio} />
                  </audio>
                  <FontAwesomeIcon icon={shareIcon} onClick={() => shareCard({audio})} 
                  style={{float: 'right', 
                  marginTop: "inherit", color:'#007bff', fontSize:'40px'}}/>
                </div>
              )}
              </div>
        </div>
      </div>
    )
}

export default VoiceNotes;