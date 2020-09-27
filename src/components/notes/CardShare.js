
import React, { Component } from "react";
class CardShare extends Component
{ 
  state = {
  text: this.props.text || ""
};
handleChangeText = event => this.setState({ text: event.target.value });
  componentDidMount() {
    this.props.onRef(this)

  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  method(val) {
  
    alert(val)
  }
  render() {
    const { text } = this.state;
    return<div className="Card-Icon"  > 
    
    
 </div>
  }

}

export default (CardShare);
