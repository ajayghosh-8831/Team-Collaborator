import React, {useEffect, useState} from 'react';
import ListItems from './TodoItems'
import  store  from "../../store"

function TODO(props) {
 
  const[items, setItems] = useState([]);
  const[currentItem, setCurrentItem] = useState({currentItem: {
                                                      text:'',
                                                      date:'',
                                                      key:''}});

  useEffect(() => {
    fetch('/fetch-user-todos/'+store.getState().userProfile.userProf.name).then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;}).then(res => res.text())
      .then(res => {
        console.log("fetching todo for personal");
        console.log(JSON.parse(res));
        let responeObj = JSON.parse(res);
        responeObj.forEach(data => {
          console.log("fetching todo for personal");
          console.log(data);
        });
      }).catch(console.log("No todo saved by user"))
  }, []);
 
  function saveItem (){
    const newItem = currentItem;
    console.log("saveItem todo")
    console.log(currentItem)
    fetch('/create-todo', {
      method: "POST", 
      body: JSON.stringify({ 
        toDoItem: newItem.text, 
        doByDateTime: newItem.date,
        userId : store.getState().userProfile.userProf.name
      })   
      })
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;})
      .then(response => response.json())
      .then(success => {
        console.log("saved todo successfully");
      })
      .catch(error => {console.log(error);}
    );
    console.log(newItem);
    setItems(items => items.concat(newItem));
  }

  const handleInput = e =>{
    console.log("handleInput");
    console.log(e);
    setCurrentItem({
      currentItem:{
        text: e.target.value,
        date: currentItem.currentItem.date,
        key: currentItem.currentItem.key
      }
    })
  }

  const handleInputDate = e => {
    console.log("handleInputDate");
    console.log(e);
    setCurrentItem({
      currentItem:{
      text: currentItem.currentItem.text,
      date: e.target.value,
      key: currentItem.currentItem.key
    }})
  }
  
  function deleteItem(key){
    const filteredItems= items.filter(item =>item.key!==key);
      setItems(filteredItems);
  }
  
  function setUpdate(text,key){
    console.log("items:"+items);
    items.map(item => {      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    setItems(items);
  }
  
  return (
    <div className="className='card work-card loading'"  style={{textAlign: 'center'}}>
      <h1>Plans for the Day</h1>
      <header>
        
          <input type="text" placeholder="Enter task" value= {currentItem.text} onChange={handleInput}></input>
          <input type="datetime-local" placeholder="Choose Date" value= {currentItem.date} onChange={handleInputDate}></input>
          <button onClick={() => saveItem()}>Add</button>
        <p>{items.text}</p>
        
          <ListItems items={items} deleteItem={deleteItem} setUpdate={setUpdate}/>
        
      </header>
    </div>
  );
}


export default TODO;
