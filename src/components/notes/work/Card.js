import "../styles/Card.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

class Card extends Component {
  state = {
    hover: false,
    editing: false,
    sharing:false,
  };

  startHover = () => this.setState({ hover: true });
  endHover = () => this.setState({ hover: false });

  endEditing = () => this.setState({ hover: false, editing: false });

  endSharing = () => this.setState({ hover: true, sharing: false });

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
              {card.text}
            </div>
          )}
        </Draggable>
      );
    } 
  }
}

const mapStateToProps = (state, ownProps) => ({
  card: state.workCardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);