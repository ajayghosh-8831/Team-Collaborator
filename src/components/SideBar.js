import { faAlignJustify,faCalendarDay,faLink,faMicrophone,faBell,faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { slide as Menu } from 'react-burger-menu'
import React, { useState, useContext } from 'react'
import "../styles/App.css";

function SideBar(props) {
    const [menuOpen, setMenuOpen] = useState(false)

    function setActiveMenu(event) {
        props.setActiveMenu(event);
    }

        return (
                <Menu isOpen={false} itemListElement="div">
                    <div id="notes"  onClick={() => setActiveMenu("notes")}>
                    <FontAwesomeIcon className="menu-icon" icon={faAlignJustify} size ="2x"/>
                        Notes
                    </div>
                    <hr/>
                    <div id="voice-notes" className="menu-item" onClick={() => setActiveMenu("voice-notes")}>
                    <FontAwesomeIcon className="menu-icon" icon={faMicrophone} size ="2x"/>
                        Voice Notes
                    </div>
                    <hr/>
                    <div id="links" className="menu-item" onClick={() => setActiveMenu("links")}>
                    <FontAwesomeIcon  className="menu-icon" icon={faLink} size ="2x"/>
                        Links
                    </div>
                    <hr/>
                    <div id="calendar" className="menu-item" onClick={() => setActiveMenu("calendar")}>
                    <FontAwesomeIcon className="menu-icon" icon={faCalendarDay} size ="2x"/>
                        Calender
                    </div>
                    <hr/>
                    <div id="to-do" className="menu-item" onClick={() => setActiveMenu("to-do")}>
                    <FontAwesomeIcon className="menu-icon" icon={faTasks} size ="2x"/>
                        To Do
                    </div>
                </Menu>
        )
}

export default SideBar;


