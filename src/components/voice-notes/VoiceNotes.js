import React, { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const recorder = new MicRecorder({
  bitRate: 128
});

const VoiceNotes = () => {

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

        let div = document.createElement('div');
        let div1 = document.createElement('div');
        let player = new Audio(URL.createObjectURL(file));
        player.controls = true;
        player.style = "width:50%"
        div1.classList = "card work-card"
        div1.appendChild(player);
        div.appendChild(div1);
        document.querySelector('#outerDiv').appendChild(div);
 
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
      <div class="container text-center">
        <h1>Voice Recorder</h1>
        <button id="recordBtn" class={buttonClass} onClick={() => clickHandler()}>{buttonText}</button>
        <div id="outerDiv" class="work-div">
        
        </div>
    </div>
    )
}

export default VoiceNotes;