import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';
import shortid from "shortid";

const WorkVoiceNotes = () => {

  const [voiceNotes, setVoiceNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/fetch-all-notes/Expedia')
    .then(res => res.text())
    .then(res => {
      //console.log(res);
      let responeObj = JSON.parse(res);
      responeObj.forEach(data => {
        console.log("work blob")
        console.log(Buffer.from(data.data));
        let file = new File(Buffer.from(data.data), 'music.mp3', {
          type: "audio/mp3",
          lastModified: Date.now()
        });
        setVoiceNotes(voiceNotes => voiceNotes.concat(URL.createObjectURL(file)))
      });
    });
  }, [1]);


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