import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {
  
  render() {
    let messageList = this.props.messages.map( ( message, index ) => {
      return (
        <Message 
          key={ index } message={ message }
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