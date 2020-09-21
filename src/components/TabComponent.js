import React, { useState } from 'react';
import { Button,Modal,TabContent, TabPane, Nav, NavItem, NavLink,Row, Col,ModalHeader, ModalBody, 
  ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import classnames from 'classnames';
import PersonalContent from "./notes/PersonalContent"
import OrganizationContent from "./notes/OrganizationContent"
import Dictaphone from './voice-notes/Dictaphone';
import store from "../store";

const Tab = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [teamName, setTeamName] = useState('');
  const [workTabTitle, setWorkTabTitle] = useState('Work');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userid = store.getState().userProfile.userProf.name;

  const toggleDropDown = () => setDropdownOpen(prevState => !prevState);
 
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  //callGetTeamName();

  const toggle = tab => {
    if(activeTab !== tab) {
      if(tab === '2'){
        callGetTeamName();
        console.log("teamName "+teamName);
        if(teamName == undefined || teamName == ""){
          setWorkTabTitle("Join a team");
          console.log("No teams are assoiciated to your account");
          //opening modal to select your team
          toggleModal();
        }else{
          setActiveTab(tab);
          setWorkTabTitle("Work "+"("+teamName+")");
        }
      }else{
        setActiveTab(tab);
      }
    }
  }

  async function callGetTeamName() {
    var response = await fetch('/teams/'+userid);
    let data = await response.json()
    console.log(data.teams[0])
    setTeamName(data.teams[0]);
  }

  async function addToTeam(team) {
  const response = await fetch('/teams/'+userid+'/'+team);
  const data = await response.json();
  callGetTeamName(userid);
  toggleModal();
  setWorkTabTitle("Work "+"("+team+")");
  }

  let activeMenu = props.activeMenu;
  console.log("######### activeMenu ####");
  console.log(activeMenu);

  return (
    <div>
      <Nav tabs justified>
        <NavItem aria-expanded>
          <NavLink 
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Personal
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            {workTabTitle}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="8">
              <h1>Your Personal Stuffs here</h1>
            </Col>           
          </Row>
          <Row>
          <div style={{ width: "100%"}}>
          {activeMenu === "notes" && <PersonalContent/>}
          {activeMenu === "voice-notes" && <Dictaphone />}
          {activeMenu === "reminder" && <h1> Personal Reminders here </h1>}
          {activeMenu === "to-do" && <h1> Personal To-Do here </h1>}
          {activeMenu === "calendar" && <h1> Personal Calendar here </h1>}
          {activeMenu === "links" && <h1> Personal Links here </h1>}
          </div>
          </Row>
        </TabPane>
        <TabPane tabId="2">
        <Row>
            <Col sm="8">
              <h1>Organization Stuffs here</h1>
            </Col>
          </Row>
          <Row>
          <div style={{ width: "100%"}}>
          {activeMenu === "notes" && <OrganizationContent/>}
          {activeMenu === "voice-notes" && <Dictaphone />}
          {activeMenu === "reminder" && <h1> Work Reminders here </h1>}
          {activeMenu === "to-do" && <h1> Work To-Do here </h1>}
          {activeMenu === "calendar" && <h1> Work Calendar here </h1>}
          {activeMenu === "links" && <h1> Work Links here </h1>}
          </div>
          </Row>
        </TabPane>
      </TabContent>
      

      <Modal isOpen={modal} toggle={toggleModal} backdrop="static">
        <ModalHeader toggle={toggleModal}>Your Teams</ModalHeader>
        <ModalBody style={{ textAlign: 'Center' }}>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
            <DropdownToggle caret>
              Select your team
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => addToTeam("Expedia")}>Expedia</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem onClick={() => addToTeam("IBS")}>IBS</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>


    </div>
  );
}

export default Tab;