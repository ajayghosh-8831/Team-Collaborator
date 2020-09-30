import "../styles/Board.css";

import React, { useState, useEffect } from "react";

const Board = () => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/notes')
    .then(res => res.text())
    .then(res => {
      let notesObj = JSON.parse(res);
      setNotes(notesObj);
    });
  }, [1]);

  return (
    <div class="work-div">
      {notes.map(note => 
      <div class="card work-card">
        <div>
          {note.noteDesc}
          <img id="Avatar" alt="User Image" class="work-notes-img" src={note.sharedByUserImg}/>
        </div>
      </div>
      )}
    </div>
  )
}

export default Board;
