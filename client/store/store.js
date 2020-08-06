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

// INITIAL STATE
const initialState = {
  messages: [],
  newMessageEntry: '',
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
    const response = await axios.post('/api/messages', messagePost);
    const message = response.data;
    const action = gotNewMessageFromServer(message);
    dispatch(action);
    socket.emit('new-message', message);
  };
};

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      console.log(action)
      return { ...state, messages: action.messages };
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.writtenMessage };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    default:
      return state;
  }
};

