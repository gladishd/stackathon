import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { connect } from 'react-redux';
import { fetchMessages } from '../store/store.js'; // this is then mapped to props as a function to dispatch
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// using withRouter fixes the
// Warning: Failed prop type: Invalid prop `component` of type `object` supplied to `Route`, expected `function`.
// error!



class MessagesList extends Component {
  // we don't want to have local state; want to use Redux store
  /* When MessagesList loads it fetches all the messages from the server
   * and puts it in local state.  */

  /* instead of making an axios.get request and sending this to state,
   * we just need to call .fetchMessages() on props. */
  componentDidMount() {
    this.props.fetchInitialMessages(); // this is from mapDispatchToProps
  }

  render() {
    // const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const channelId = 1;
    const messages = this.props.messages; // everything is on props
    // When it renders, it filters out messages for the appropriate channel based on :channelId
    messages.sort((a, b) => (a.id > b.id) ? 1 : -1)
    const filteredMessages = messages.filter(
      (message) => message.channelId === channelId
    );
    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.addMessages.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialMessages: () => dispatch(fetchMessages()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MessagesList)
);
