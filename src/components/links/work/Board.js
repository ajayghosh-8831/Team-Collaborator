import "../styles/Board.css";

import React, { useState, useEffect } from "react";
import Skeleton from '@yisheng90/react-loading';

const Board = () => {

  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:4000/links')
    .then(res => res.text())
    .then(res => {
      let linksObj = JSON.parse(res);
      setLinks(linksObj);
      setIsLoading(false);
    });
  }, [1]);
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
            <img id="Avatar" alt="User Image" className="work-notes-img" src={link.sharedByUserImg}/>
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
