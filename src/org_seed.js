import shortid from "shortid";
export default org_store => {
  console.log("Insert first list");
  const firstListId = shortid.generate();
  const orgListId = shortid.generate();

  fetchAndCreateOrgNotes();

  function fetchAndCreateOrgNotes() {
    console.log("Inside seed.js")
    //fetching the notes from DB
    fetch('http://localhost:4000/notes')
    .then(res => res.text())
    .then(res => {
      let notesObj = JSON.parse(res);
      //looping over the notesobject
      notesObj.forEach((listData) => {
        org_store.dispatch({
          type: "ADD_CARD_ORG",
          payload: {
            listId: firstListId,
            cardId: listData._id,
            cardText: listData.noteDesc
          }
        });
      })
    });
  }
 

  org_store.dispatch({
    type: "ADD_LIST_ORG",
    payload: { listId: orgListId, listTitle: "Team Note" }
  });


  
 

  org_store.dispatch({
    type:"USER_LOGIN",
    payload:{
      userEmail:"",
      name:"",
      imageUrl:"https://www.w3schools.com/howto/img_avatar2.png"
    }
  });
};