import React, { Component } from 'react'
import Message from './Message'
import NewMessageEntry from './NewMessageEntry'
import axios from 'axios'

export default class MessagesList extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: [] }
  }

  // componentDidMount() {
  //   console.log('did the MessagesList component log?')
  //   console.log(this.props)
  // }

  async componentDidMount() {
    console.log('did we reach the messageslist component?')
    const response = await axios.get('/api/messages')
    const messages = response.data
    this.setState({ messages })
  }

  render() {
    // console.log(this.props)
    // console.log('did we reach the messageslist component?')
    const channelId = Number(this.props.match.params.channelId) // because it's a string "1", not a number!
    const messages = this.state.messages
    const filteredMessages = messages.filter(
      message => message.channelId === channelId
    )

    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map(message => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <NewMessageEntry />
        HI
      </div>
    )
  }
}
