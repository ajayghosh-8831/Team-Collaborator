import "../styles/Board.css";

import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  store  from "../../../store"
import { useSelector } from "react-redux";

const Board = (props) => {

  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cards = useSelector(state => state.cardsById);

  function sharedCard(link){
    console.log(link);
    fetch('/create-link', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
          },
          body: JSON.stringify({linkTitle: link.link.linkTitle, 
            linkUrl: link.link.linkUrl, isShared: true, 
            teamName: "Expedia",
            userId : store.getState().userProfile.userProf.name,
            userImg : store.getState().userProfile.userProf.imageUrl
          })   
        }).then( json => {
          console.log("Successfully shared links")
        })
        .catch((error) => {
          console.log("error while sharing links")
        });
  };


  useEffect(() => {
    console.log("cardsById from store");
    console.log(Object.keys(cards).length);
    setIsLoading(true);
    fetch('/fetch-user-saved-links/'+store.getState().userProfile.userProf.name)
    .then(res => res.text())
    .then(res => {
      let linksObj = JSON.parse(res);
      setLinks(linksObj);
      setIsLoading(false);
    }).catch((error)=> console.log(error));
  }, [cards]);
  //{isLoading && <Skeleton width={250} row={6} />}
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
      <div className="work-div">
      {links.map(link => 
        <div className="card work-card">
          <div>
            {link.linkUrl}
            <FontAwesomeIcon icon={faShareAlt} onClick={() => sharedCard({link})}
                          style={{float: 'right', 
                          marginTop: "inherit", color:'#007bff', fontSize:'30px'}}/>
          </div>
        </div>
        )}
      </div>
    )}
    </div>
    </div>
  )
}

export default Board;
