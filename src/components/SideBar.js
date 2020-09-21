import React, { Component, useState} from 'react';
import { faAlignJustify,faCalendarDay,faLink,faMicrophone,faBell,faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container,Col,Row, ListGroup, ListGroupItem} from 'reactstrap';


function SideBar(props) {

    function setActiveMenu(event) {
        // Here, we invoke the callback with the new value
        props.setActiveMenu(event);
    }

        return (
            <span>
                <Col id="Menu" md="2">
                <span className="navLabel">Pick your tool here</span>
                <hr/>
                <ListGroup>
                    <Row>
                    <ListGroupItem active tag="button" onClick={() => setActiveMenu("notes")}>
                    <FontAwesomeIcon icon={faAlignJustify} size ="2x"/>
                    <span className="navLabel">Notes</span>
                    </ListGroupItem>
                    </Row>
                    <Row>
                    <ListGroupItem tag="button" onClick={() => setActiveMenu("links")}>
                    <FontAwesomeIcon icon={faLink} size ="2x"/>
                    <span className="navLabel">Links</span>
                    </ListGroupItem>
                    </Row>
                    <Row>
                    <ListGroupItem tag="button" onClick={() => setActiveMenu("voice-notes")}>
                    <FontAwesomeIcon icon={faMicrophone} size ="2x"/>
                    <span className="navLabel">Voice Notes</span>
                    </ListGroupItem>
                    </Row>
                    <Row>
                    <ListGroupItem tag="button" onClick={() => setActiveMenu("calendar")}>
                    <FontAwesomeIcon icon={faCalendarDay} size ="2x"/>
                    <span className="navLabel">Calender</span>
                    </ListGroupItem>
                    </Row>
                    <Row>
                    <ListGroupItem tag="button" onClick={() => setActiveMenu("reminder")}>
                    <FontAwesomeIcon icon={faBell} size ="2x"/>
                    <span className="navLabel">Reminder</span>
                    </ListGroupItem>
                    </Row>
                    <Row>
                    <ListGroupItem tag="button" onClick={() => setActiveMenu("to-do")}>
                    <FontAwesomeIcon icon={faTasks} size ="2x"/>
                    <span className="navLabel">To Do</span>
                    </ListGroupItem>
                    </Row>
                </ListGroup>
                </Col>
            </span>
        )
}

export default SideBar;


