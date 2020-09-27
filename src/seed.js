import shortid from "shortid";
import React, { Component } from "react";
export default store => {
  console.log("Insert first list");
  const firstListId = shortid.generate();
  const orgListId = shortid.generate();

  fetchAndCreateNotes();

 

  function fetchAndCreateNotes() {
    console.log("Inside seed.js")
    //fetching the notes from DB
    fetch('http://localhost:4000/notes')
    .then(res => res.text())
    .then(res => {
      let notesObj = JSON.parse(res);
      //looping over the notesobject
      notesObj.forEach((listData) => {
        store.dispatch({
          type: "ADD_CARD",
          payload: {
            listId: firstListId,
            cardId: listData._id,
            cardText: listData.noteDesc
          }
        });
      })
    });
  }


  store.dispatch({
    type: "ADD_LIST",
    payload: { listId: firstListId, listTitle: "My Note" }
  });

  store.dispatch({
    type:"USER_LOGIN",
    payload:{
      userEmail:"",
      name:"",
      imageUrl:"https://www.w3schools.com/howto/img_avatar2.png"
    }
  });
};