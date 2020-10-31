import React, { Component, useState } from 'react';
import { Container, Row, Col,Button } from 'reactstrap';
import Tab from  './TabComponent';
import store from "../store";


function Header(props) {

    let userProfile = store.getState().userProfile.userProf;
    console.log("###########userProfile############")
    console.log(userProfile)
    
        return (
            <Container fluid>
                <Row>
                    <Col md="2" id="col1"><span id="HeaderText">Organize</span></Col>
                    <Col id="TabColumn">
                        <Row>
                            <Col md={{ size: 1, offset: 11 }}><Button id ="AvatarBtn"outline color="secondary"><img id="Avatar" alt="User Image" src={userProfile === undefined ? "" : store.getState().userProfile.userProf.imageUrl}/></Button></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Tab activeMenu={props.menuItem}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        );
}

export default Header;
