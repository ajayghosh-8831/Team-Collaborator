import React, { useState, useEffect} from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import shortid from "shortid";
import  store  from "../../store"
import { faShareAlt, faCheckCircle, faSave} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Skeleton from '@yisheng90/react-loading';

const recorder = new MicRecorder({
  bitRate: 128
});

const VoiceNotes = () => {

    const [buttonText, setButtonText] = useState('Start recording');
    const [buttonClass, setButtonClass] = useState('btn btn-primary');
    const [shareIcon, setShareIcon] = useState(faShareAlt);
    const [audioElements, setAudioElements] = useState([]);
    const [voiceNotes, setVoiceNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        let audioData = {"audio":URL.createObjectURL(file), "audioId":shortid.generate()}
        setAudioElements(audioElements => audioElements.concat(audioData))
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

    useEffect(() => {
      setIsLoading(true);
      fetch('/fetch-user-notes/'+store.getState().userProfile.userProf.name)
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;})
      .then(res => res.text())
      .then(res => {
        let responeObj = JSON.parse(res);
        responeObj.forEach(data => {
          console.log("fetching notes for personal");
          console.log(data);
          var base64Flag = 'data:audio/mp3;base64,';
          var audioStr = arrayBufferToBase64(data.data.data);
          let audioData = {"audio":base64Flag+audioStr, "audioId":data.audioId}
          setVoiceNotes(voiceNotes => voiceNotes.concat(audioData))
          setIsLoading(false);
        });
      }).catch(console.log("No notes saved by user"));
    }, [1]);
  
    function arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      return window.btoa(binary);
    };

    
    
    async function saveCard (audioData) {
        console.log(audioData.audioData.audioId)
        let blob = await fetch(audioData.audioData.audio).then(r => r.blob());
        var formData = new FormData();
        formData.append('myAudio', blob);
        formData.append('createdBy', store.getState().userProfile.userProf.name);
        formData.append('audioId', audioData.audioData.audioId);
        formData.append('sharedByUserImg', store.getState().userProfile.userProf.imageUrl);
  
        fetch('/save-voice-notes', {
          method: "POST", body: formData
          }).then(response => response.json())
          .then(success => {
            alert("saved successfully");
          })
          .catch(error => {console.log(error); alert("failed")}
        );
          
    };

    async function shareCard (audioData) {
      if(shareIcon !== faCheckCircle){
        let blob = await fetch(audioData.audioData.audio).then(r => r.blob());
        var formData = new FormData();
        formData.append('myAudio', blob);
        formData.append('sharedBy', store.getState().userProfile.userProf.name);
        formData.append('sharedByUserImg', store.getState().userProfile.userProf.imageUrl);
        formData.append('audioId', audioData.audioData.audioId);
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
      <div>
      <div className="container text-center" style={{marginTop:"2%"}}>
      <button id="recordBtn" className={buttonClass} onClick={() => clickHandler()}>{buttonText}</button>
        <div>
              <div id="outerDiv" className="work-div">
              {audioElements.map(audioData => 
              <div className="card work-card" id={shortid.generate()}>
                  <audio preload="auto" controls style={{width: '50%'}}>
                    <source src={audioData.audio} />
                  </audio>
                  <FontAwesomeIcon icon={shareIcon} onClick={() => shareCard({audioData})} 
                  style={{float: 'right', 
                  marginTop: "inherit", color:'#007bff', fontSize:'40px'}}/>
                  <FontAwesomeIcon icon={faSave} onClick={() => saveCard({audioData})} 
                  style={{float: 'left', 
                  marginTop: "inherit", color:'#007bff', fontSize:'40px'}}/>
                </div>
              )}
              </div>
        </div>
      </div>
      <h1 style={{textAlign: 'center'}}>Your saved cards</h1>
        <div>
        <div>
        {isLoading && (
          <div className="work-div">
              <div className="card work-card loading">
              <Skeleton row={1} />
              </div>
              <div className="card work-card loading">
              <Skeleton row={1} />
              </div>
              <div className="card work-card loading">
              <Skeleton row={1} />
              </div>
              <div className="card work-card loading">
              <Skeleton row={1} />
              </div>
              <div className="card work-card loading">
              <Skeleton row={1} isLoading={!isLoading} />
              </div>
            </div>
              )}
          </div>
            <div>
            {!isLoading && (
              <div className="container text-center" style={{marginTop:"2%"}}>
                <div>
                      <div id="outerDiv" className="work-div">
                      {voiceNotes.map(audioData => 
                      <div className="card work-card">
                          <audio preload="auto" controls style={{width: '50%'}}>
                            <source src={audioData.audio} />
                          </audio>
                          <FontAwesomeIcon icon={shareIcon} onClick={() => shareCard({audioData})} 
                          style={{float: 'right', 
                          marginTop: "inherit", color:'#007bff', fontSize:'40px'}}/>
                        </div>
                      )}
                      </div>
                </div>
              </div> )}
          </div>
          </div>
          </div>
    )
}

export default VoiceNotes;