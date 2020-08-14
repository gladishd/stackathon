import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

// MIDDLEWARE
const middleware = applyMiddleware(thunkMiddleware);

// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const POSTED_NEW_GRAPH_DATA = 'POSTED_NEW_GRAPH_DATA';

// INITIAL STATE
const initialState = {
  messages: [],
  newMessageEntry: '',
  newGraphData: {}
};

// ACTION CREATORS
export const gotMessagesFromServer = (messages) => ({
  type: GOT_MESSAGES_FROM_SERVER, // using a constant, not a string literal
  messages,
});

export const writeMessage = (writtenMessage) => ({
  type: WRITE_MESSAGE,
  writtenMessage,
});

export const gotNewMessageFromServer = (newMessage) => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  newMessage,
});

export const postedNewGraphData = (data) => ({
  type: POSTED_NEW_GRAPH_DATA,
  data,
})

// thunk-creator is an action creator; our 'thunk creator'
export const fetchMessages = () => {
  // the inner function is our 'thunk'
  return async (dispatch) => {
    const response = await axios.get('/api/messages');
    const messages = response.data;
    const action = gotMessagesFromServer(messages);
    dispatch(action);
  };
};

export const postNewMessageEntry = (messagePost) => {
  // the inner function is our 'thunk'
  return async (dispatch) => {
    console.log('the message post sent to the thunk is ', messagePost)
    const response = await axios.post('/api/messages', messagePost); // this is where the image is decided
    console.log('the response sent back from the server is, ', response)
    const message = response.data;
    const action = gotNewMessageFromServer(message);
    dispatch(action);
    socket.emit('new-message', message);
  };
};

export const postNewGraphData = (data, labels) => {
  console.log('did we reach the postnew graph data thuhk?', data, labels)
  return async (dispatch) => {
    const response = await axios.post('/api/graphs', { data, labels })
    console.log('within the postNewgraphData thunk, the response sent from the server was ,', response)
    const action = postedNewGraphData(response.data);
    dispatch(action);
  }
}


// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.writtenMessage };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    case POSTED_NEW_GRAPH_DATA:
      return {
        ...state, newGraphData: action.data
      };
    default:
      return state;
  }
};

