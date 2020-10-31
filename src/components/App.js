import "../styles/App.css";

import React, { Component, useState } from "react";
import SideBar from './SideBar';
import Header from './HeaderComponent';
import Tab from  './TabComponent';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {GoogleLogin} from 'react-google-login';
import store from "../store";

import { refreshTokenSetup } from '../utils/refreshToken';

const clientId= "365890450292-2cpvutu0t85nbale2sdhqp87r949ifv7.apps.googleusercontent.com";


function App() {
  // Declare a new state variable, which we'll call "count"
  
  const [menuItem, setActiveMenu] = useState("notes");
  const [modal, setModal] = useState(true);
  //const [backdrop, setBackdrop] = useState(false);
  //const [keyboard, setKeyboard] = useState(false);

  const toggle = () => setModal(!modal);

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    /*alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );*/
    refreshTokenSetup(res);
    store.dispatch({
      type: "USER_LOGIN",
      payload: {userEmail:res.profileObj.email,name:res.profileObj.name,imageUrl:res.profileObj.imageUrl}
    });
    createUser(res);
    toggle();
  };

  async function createUser(userDetails) {
    console.log("Creating user in DB "+userDetails.profileObj.name)
    const response = await fetch('http://localhost:4000/user/'+userDetails.profileObj.name);
    const data = await response.json();
  }

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    /*alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );*/
    
  };

  return (
    <div>
      <div id="mainContent">
      <Header menuItem={menuItem}/>
      <SideBar setActiveMenu={setActiveMenu}/>
      </div>
      <Modal isOpen={modal} toggle={toggle} backdrop={false} keyboard={false} fade={false}>
        <ModalHeader>Login with Google</ModalHeader>
        <ModalBody>
          Please Click the below button to login using your Google Credentials
        </ModalBody>
        <ModalFooter>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '100px' }}
          isSignedIn={true}
        />
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;