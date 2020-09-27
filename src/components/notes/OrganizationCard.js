import "../../styles/Card.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import CardEditor from "./CardEditor";

class OrganizationCard extends Component {
  state = {
    hover: false,
    editing: false,
    sharing:false,
  };

  startHover = () => this.setState({ hover: true });
  endHover = () => this.setState({ hover: false });

  startEditing = () =>
    this.setState({
      hover: false,
      editing: true,
      sharing:false,
      text: this.props.card.text
    });

  endEditing = () => this.setState({ hover: false, editing: false });

  editCard = async text => {
    const { card, dispatch } = this.props;

    this.endEditing();

    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card._id, cardText: text }
    });
  };

  endSharing = () => this.setState({ hover: true, sharing: false });

  shareCard = async text => {  // We cac call Share API call here
    const { card, dispatch } = this.props;
    alert("card Id :"+card._id +" & "+"card Text :" +card.text )
    this.endSharing();

   
  };

  deleteCard = async () => {
    const { listId, card, dispatch } = this.props;

    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId }
    });
  };


  render() {
  
    const { card, index } = this.props;
    const { hover, editing,sharing } = this.state;

    if ((!editing && !sharing) ||(!editing && sharing)) {
      return (
        <Draggable draggableId={card._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="Card"
              onMouseEnter={this.startHover}
              onMouseLeave={this.endHover}
            >
              {hover && (
                <div className="Card-Icons">
            
                  <div className="Card-Icon" onClick={this.startEditing}>
                    <ion-icon name="create" /> </div>
                    <div className="Card-Icon" onClick={this.shareCard}  >
                    <ion-icon ios="ios-share" md="md-share"></ion-icon>
                 
                  </div>
               
                </div>
              )}
      

              {card.text}
            </div>
          )}
        </Draggable>
      );
     
    } 
     if(!sharing && editing)
     {
      return (
        <CardEditor
          text={card.text}
          onSave={this.editCard}
          onDelete={this.deleteCard}
          onCancel={this.endEditing}
        />
      );
    }
   
  }

}

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(OrganizationCard);
