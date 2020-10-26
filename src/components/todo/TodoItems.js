import React, {useEffect} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

function ListItems(props){
    const itemArray = props.items;
    console.log("inside list items");
    console.log(itemArray);

return ( 
<div>
{itemArray.map(item =>
<div className="list" key={item.currentItem.key}>
     <p>
         <input type="text" value={item.currentItem.text} onChange={(e)=>{
             props.setUpdate(e.target.value,item.currentItem.key)}}/>
        <input type="hidden" value={item.currentItem.date}/>
        <span>
       
        <FontAwesomeIcon className="faicons" onClick={() => {
            props.deleteItem(item.currentItem.key)
        }} icon={faTrashAlt} style={{marginLeft: "10px"}}/>
        </span>
     </p>
     
    </div>
    )}
</div>
)
}
export default ListItems;
