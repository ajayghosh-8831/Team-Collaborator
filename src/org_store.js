import { combineReducers, createStore } from "redux";
import throttle from "lodash.throttle";
import org_seed from "./org_seed";

const org_board = (state = { lists: [] }, action) => {
  switch (action.type) {
    case "ADD_LIST_ORG": {
      const { listId } = action.payload;
      return { lists: [...state.lists, listId] };
    }
    case "MOVE_LIST": {
      const { oldListIndex, newListIndex } = action.payload;
      const newLists = Array.from(state.lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return { lists: newLists };
    }
    case "DELETE_LIST": {
      const { listId } = action.payload;
      const filterDeleted = tmpListId => tmpListId !== listId;
      const newLists = state.lists.filter(filterDeleted);
      return { lists: newLists };
    }
    default:
      return state;
  }
};

const listsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LIST_ORG": {

      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { _id: listId, title: listTitle, org_cards: [] }
      };
    }
    case "CHANGE_LIST_TITLE": {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], title: listTitle }
      };
    }
    case "DELETE_LIST": {
      const { listId } = action.payload;
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    }
    case "ADD_CARD_ORG": {
      const { listId, org_cardId } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], org_cards: [...state[listId].org_cards, org_cardId] }
      };
    }
    case "MOVE_CARD_ORG": {
      const {
        oldCardIndex,
        newCardIndex,
        sourceListId,
        destListId
      } = action.payload;
      // Move within the same list
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].org_cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], org_cards: newCards }
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].org_cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].org_cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], org_cards: sourceCards },
        [destListId]: { ...state[destListId], org_cards: destinationCards }
      };
    }
    case "DELETE_CARD_ORG": {
      const { org_cardId: deletedCardId, listId } = action.payload;
      const filterDeleted = org_cardId => org_cardId !== deletedCardId;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          org_cards: state[listId].org_cards.filter(filterDeleted)
        }
      };
    }
    default:
      return state;
  }
};

const cardsById = (state = {}, action) => {
  switch (action.type) {
    case "ADD_CARD_ORG": {
      const { cardText, org_cardId } = action.payload;
      return { ...state, [org_cardId]: { text: cardText, _id: org_cardId } };
    }
    case "CHANGE_CARD_TEXT_ORG": {
      const { cardText, org_cardId } = action.payload;
      return { ...state, [org_cardId]: { ...state[org_cardId], text: cardText } };
    }
    case "DELETE_CARD_ORG": {
      const { org_cardId } = action.payload;
      const { [org_cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    // Find every card from the deleted list and remove it
    case "DELETE_LIST_ORG": {
      const { org_cards: org_cardIds } = action.payload;
      return Object.keys(state)
        .filter(org_cardId => !org_cardIds.includes(org_cardId))
        .reduce(
          (newState, org_cardId) => ({ ...newState, [org_cardId]: state[org_cardId] }),
          {}
        );
    }
    default:
      return state;
  }
};

const userProfile =(state = {}, action) => {
  switch(action.type){
    case "USER_LOGIN":{
      const {userEmail,name,imageUrl} = action.payload;
      return{...state, userProf:{userEmail,name,imageUrl}}
    }
    default:
      return state;
  }
}

const reducers = combineReducers({
  org_board,
  listsById,
  cardsById,
  userProfile
});

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
  
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();
const org_store = createStore(reducers, persistedState);

org_store.subscribe(
  throttle(() => {
    saveState(org_store.getState());
  }, 1000)
);

console.log(org_store.getState());
if (!org_store.getState().org_board.lists.length) {
  console.log("ORG_SEED");
  org_seed(org_store);
}

export default org_store;
