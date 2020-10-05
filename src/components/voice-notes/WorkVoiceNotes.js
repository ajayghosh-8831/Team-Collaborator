import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';
import shortid from "shortid";

const WorkVoiceNotes = () => {

  const [voiceNotes, setVoiceNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/fetch-all-notes/Expedia')
    .then(res => res.text())
    .then(res => {
      //console.log(res);
      let responeObj = JSON.parse(res);
      responeObj.forEach(data => {
        var base64Flag = 'data:audio/mp3;base64,';
        var audioStr = arrayBufferToBase64(data.data.data);
        setVoiceNotes(voiceNotes => voiceNotes.concat(base64Flag+audioStr))
        setIsLoading(false);
      });
    });
  }, [1]);

  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };



  return (  
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
              {voiceNotes.map(audio => 
              <div className="card work-card" id={shortid.generate()}>
                  <audio preload="auto" controls style={{width: '50%'}}>
                    <source src={audio} />
                  </audio>
                  <img id="Avatar" alt="User Image" className="work-notes-img" src={""}/>
                </div>
              )}
              </div>
        </div>
      </div>
    )}
    </div>
    </div>
  )
}

export default WorkVoiceNotes;