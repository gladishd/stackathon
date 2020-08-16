import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeMessage, postNewMessageEntry } from '../store/store.js';
import { Howl } from 'howler'
class NewMessageEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessageEntry: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.loadFile = this.loadFile.bind(this);
    this.sound5 = this.sound5.bind(this);
  }
  handleChange(event) {
    this.props.write(event.target.value);
    this.setState({ newMessageEntry: event.target.value })
  }
  handleSubmit(evt) {
    evt.preventDefault(); // don't forget to preventDefault!
    // our message content is on our state, which we're getting from our Redux store

    const content = this.props.newMessageEntry;
    const channelId = 1;

    const name = this.props.reduxState.user.displayName || 'Guest'; // this should be by default.
    // when the user logs in, their real name should be
    // displayed.

    this.props.post({ content, channelId, name });

    this.setState({
      newMessageEntry: ''
    })
  }

  uploadImage(event) {
    event.preventDefault();
    var theFile = document.getElementById("imageUpload");

  }

  loadFile(event) {
    var image = document.getElementById('output');
    console.log(URL.createObjectURL(event.target.files[0]))
    image.src = URL.createObjectURL(event.target.files[0]);
  }

  sound5() {
    const Sounds = new Howl({ src: ['/5.wav'] })
    Sounds.play()
  }

  render() {



    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            id='form'
            type="text"
            name="content"
            value={this.state.newMessageEntry}
            onChange={this.handleChange}
            placeholder=""
          />

          <input type="file" accept="image/*" name="image" id="file" onChange={this.loadFile} style={{ "display": "none" }} />
          <p><label htmlFor="file" style={{ "cursor": "pointer" }}>Upload Image</label></p>
          <img id="output" width="200" />

          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
            <button type="button" onClick={this.sound5}>
              Sound
        </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newMessageEntry: state.addMessages.newMessageEntry,
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    userEmail: state.user.email,
    googleId: state.user.googleId,
    reduxState: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    write: (string) => dispatch(writeMessage(string)),
    post: (message) => dispatch(postNewMessageEntry(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
