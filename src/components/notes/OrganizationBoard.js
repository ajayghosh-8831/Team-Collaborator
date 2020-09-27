import "../../styles/Board.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import OrganizationList from "./OrganizationList";
import OrganizationAddList from "./OrganizationAddList";

class OrganizationBoard extends Component {
  state = {
    orgaddingList: false
  };

  toggleAddingList = () =>
    this.setState({ orgaddingList: !this.state.orgaddingList });

  handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the allowed zones
    if (!destination) return;

    const { dispatch } = this.props;

    // Move list
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
          type: "MOVE_LIST",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index
          }
        });
      }
      return;
    }

    // Move card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index
        }
      });
    }
  };

  render() {
    const { org_board } = this.props;
    const { orgaddingList } = this.state;

    return (
      
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="OrganizationBoard" direction="horizontal" type="COLUMN">
          {(provided, _snapshot) => (
            <div className="Board" ref={provided.innerRef}>
              {org_board.lists.map((listId, index) => {
                return <OrganizationList listId={listId} key={listId} index={index} />;
              })}
Test
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({ org_board: state.org_board });

export default connect(mapStateToProps)(OrganizationBoard);
