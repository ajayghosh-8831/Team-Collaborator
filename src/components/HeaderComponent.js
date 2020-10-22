import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col,Button,Modal,ModalHeader,ModalBody,ModalFooter,Table } from 'reactstrap';
import Tab from  './TabComponent';
import store from "../store";

function Header(props) {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [leaderBoardData, setLeaderBoardData] = useState([]);

    useEffect(() => {
        fetch('/fetch-leaderboard')
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;})
        .then(res => res.text())
        .then(res => {
          console.log(res);
          let responeObj = JSON.parse(res);
          responeObj.sort((a, b) => {
            return b.points - a.points;
            });
          setLeaderBoardData(responeObj)
        }).catch(error => console.log("fetching user points failed"));
      }, [modal]);


    let userProfile = store.getState().userProfile.userProf;
    console.log("###########userProfile############")
    console.log(userProfile)
    
        return (
            <Container fluid>
                <Row>
                    <Col id="TabColumn">
                        <Row>
                            <Col md={{ size: 1, offset: 11 }}>
                                <Button id ="AvatarBtn" onClick={toggleModal} outline color="secondary" style={{float:"right"}}>
                                    <img id="Avatar" alt="User Image" src={userProfile === undefined ? "" : store.getState().userProfile.userProf.imageUrl}/>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Tab activeMenu={props.menuItem}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Modal isOpen={modal} toggle={toggleModal} backdrop="static">
                    <ModalHeader toggle={toggleModal}  
                    style={{ textAlign: 'Center' }} >LeaderBoard</ModalHeader>
                    <ModalBody style={{ textAlign: 'Center', padding:"4px" }}>
                    <Table dark hover style={{ marginBottom: '0px' }}>
                        <thead>
                            <tr>
                            <th>Points</th>
                            <th>Name</th>
                            <th>User</th>
                            </tr>
                        </thead>
                    {leaderBoardData.map((data, index) => 
                        <tbody>
                            <tr>
                            <td>{data.points}</td>
                            <td>{data.userid}</td>
                            <td><img id="Avatar" alt="User Image" src={data.userImg}/></td>
                            </tr>
                        </tbody>
                        )}
                        </Table>
                    </ModalBody>
                </Modal>
            </Container>
        );
}

export default Header;
