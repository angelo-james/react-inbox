import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {
  
  render() {
    let messageList = this.props.messages.map( ( message, index ) => {
      return (
        <Message 
          key={ index } 
          message={ message }
          starredMessage={ this.props.starredMessage }
          selectedMessage={ this.props.selectedMessage }
          readMessage={ this.props.readMessage }
        />
      )
    })

    return (
      <div>
        { messageList }
      </div>
    )
  }
}

export default MessageList