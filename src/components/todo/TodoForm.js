import React, {useEffect} from 'react';
import ListItems from './TodoItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import  store  from "../../store"

library.add(faTrash);

useEffect(() => {
  effect
  return () => {
    cleanup
  }
}, [input]);

class TODO extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        date:'',
        key:''
      }
    }
    //this.saveItem = this.saveItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputDate = this.handleInputDate.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    //this.setSaved = this.setSaved.bind(this);
  }
  componentDidMount() {
    fetch(`/fetch-user-todos/${store.getState().userProfile.userProf.name}`).then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;}).then(res => res.text())
      .then(res => {
        let responeObj = JSON.parse(res);
        responeObj.forEach(data => {
          console.log("fetching voice notes for personal");
          console.log(data);
        });
      }).catch(console.log("No notes saved by user"))
  }
  componentDidUpdate(){
    fetch('/fetch-user-todos/'+store.getState().userProfile.userProf.name).then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;}).then(res => res.text())
      .then(res => {
        let responeObj = JSON.parse(res);
        responeObj.forEach(data => {
          console.log("fetching voice notes for personal");
          console.log(data);
        });
      }).catch(console.log("No notes saved by user"))
  }
 
  saveItem = () => {
    const newItem = this.state.currentItem;
    fetch('/create-todo', {
      method: "POST", body: JSON.stringify({ 
        toDoItem: newItem.text, 
        doByDateTime: newItem.date,
        userId : store.getState().userProfile.userProf.name
      })   
      }).then(response => response.json())
      .then(success => {
        // setSaved(true);
        alert("saved successfully");
      })
      .catch(error => {console.log(error); alert("failed")}
    );
    const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        date:'',
        key:''
      }
    });
  }
  // updateItem = async item => {
  //   await fetch('/edit-todo', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ 
  //       toDoItem: item.text, 
  //       doByDateTime: item.date,
  //     })   
  //   }).then( json => {
  //     this.setState({message_type:"success",message_text:item.text+"  Shared successfully"});
  //   })
  //   .catch((error) => {
  //     this.setState({message_type:"error",message_text:"Error occured in shred functionality"});
  //   });
   
  // }

  deleteItem = ()=>{
    const {item, dispatch } = this.props;
    dispatch({
      type: "DELETE_CARD",
      payload: { todoId: item.key}
    });
    
  }

  addItem(e) {
    e.preventDefault(); 
    const newItem = this.state.currentItem;
    if(newItem.text !=="" && newItem.date !== ""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        date:'',
        key:''
      }
    })
  }
    fetch('/edit-todo', {
      method: "POST", body: JSON.stringify({ 
        toDoItem: newItem.text, 
        doByDateTime: newItem.date,
        userId : store.getState().userProfile.userProf.name
      })   
      }).then(response => response.json())
      .then(success => {
        // setSaved(true);
        //alert("saved successfully");
      })
      .catch(error => {console.log(error); alert("failed")}
    );
  }

  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  handleInputDate(e){
    this.setState({
      currentItem:{
        date: e.target.value,
        key: Date.now()
      }
    })
  }
  
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

    this.deleteItem(this.key)
  }
  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item => {      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    // axios.fetch('/edit-todo', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ 
    //     toDoItem: items.text, 
    //     doByDateTime: items.date,
    //   })   
    // }).then( json => {
    //   this.setState({message_type:"success",message_text:items.text+"  Shared successfully"});
    // })
    // .catch((error) => {
    //   this.setState({message_type:"error",message_text:"Error occured in shred functionality"});
    // });
    
  }
  
 render(){
  return (
    <div className="className='card work-card loading'"  style={{textAlign: 'center'}}>
      <h1>Plans for the Day</h1>
      <header>
        <form id="to-do-form" onSubmit={this.saveItem}>
          <input type="text" placeholder="Enter task" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <input type="date" placeholder="Choose Date" value= {this.state.currentItem.date} onChange={this.handleInputDate}></input>
          <button type="submit"  onSubmit={this.saveItem}>Add</button>
        </form>
        <p>{this.state.items.text}</p>
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
        
      </header>
    </div>
  );
 }
}


export default TODO;
