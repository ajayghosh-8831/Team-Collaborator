import shortid from "shortid";

export default store => {
  console.log("Insert first list");
  const firstListId = shortid.generate();

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
          type: "ADD_LIST",
          payload: { listId: listData._id, listTitle: listData.noteTitle }
        });
      })
    });
  }

  store.dispatch({
    type: "ADD_LIST",
    payload: { listId: firstListId, listTitle: "First list" }
  });

  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: "First card"
    }
  });

  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: "Second card"
    }
  });

  console.log("Insert second list");
  const secondListId = shortid.generate();

  store.dispatch({
    type: "ADD_LIST",
    payload: { listId: secondListId, listTitle: "Second list" }
  });

  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: secondListId,
      cardId: shortid.generate(),
      cardText: "Card 1"
    }
  });

  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: secondListId,
      cardId: shortid.generate(),
      cardText: "Card 2"
    }
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
