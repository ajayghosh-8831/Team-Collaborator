import React, { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const recorder = new MicRecorder({
  bitRate: 128
});

const Dictaphone = (props) => {

    const [buttonText, setButtonText] = useState('Start recording');
    const [buttonClass, setButtonClass] = useState('btn btn-primary');

    function startRecording() {
      recorder.start().then(() => {
        console.log("Started recording")
        setButtonText('Stop recording');
        setButtonClass('btn btn-primary btn-danger');
      }).catch((e) => {
        console.error(e);
      });
    }

    function stopRecording() {
      recorder.stop().getMp3().then(([buffer, blob]) => {
        console.log(buffer, blob);
        let file = new File(buffer, 'music.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });

        let li = document.createElement('li');
        let player = new Audio(URL.createObjectURL(file));
        player.controls = true;
        player.style = "width:50%"
        li.appendChild(player);
        document.querySelector('#playlist').appendChild(li);
 
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
  
    return (
      <div className="container text-center">
        <h1>Voice Recorder</h1>
        <hr />
        <button id="recordBtn" className={buttonClass} onClick={() => clickHandler()}>{buttonText}</button>
        <hr />
        <ol id="playlist"></ol>
      </div>
    )
}

export default Dictaphone;