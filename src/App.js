import React, { Component } from 'react';
import './App.css';

import Toolbar from './Components/Toolbar';
import ComposeForm from './Components/ComposeForm'
import MessageList from './Components/MessageList'

class App extends Component {

  state = {
    messages: [],
    display: false
  }

  async componentDidMount() {
    this.fetchMessages()
  }

  fetchMessages = async () => {
    const messages = await fetch('http://localhost:8082/api/messages')
    const messagesJson = await messages.json()

    this.setState( { messages: messagesJson } )
  }
  //starredMessage method is checking if the method is true or false and setting the key of starred opposite to what it is currently set as
  starredMessage = ( message ) => {
    let messageIds = [ message.id ]
  
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds,
        command: 'star'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    message.starred = !message.starred
    this.setState( this.state.messages.concat( message ))
  }
  //selected method is setting the key of selected to true or false depending on what the current value is and setting it to the opposite value
  selectedMessage = ( message ) => {
    message.selected = !message.selected
    this.setState( this.state.messages.concat( message ))
  }
  //read method is setting the value of the key read to true when clicked
  readMessage = ( message ) => {
    message.read = true

    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [message.id],
        command: 'read',
        read: true
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    this.setState( this.state.messages.concat( message ))
  }
  //selectedBox method is 
  selectedBox = () => {
    let selectedBoxes = this.state.messages.filter( message => {
      return message.selected
    }).length
    let action = ''

    if (selectedBoxes === this.state.messages.length) {
      action = '-check'
    } else if (selectedBoxes === 0) {
      action = ''
    } else {
      action = '-minus'
    }
    return action
  }
  //this method is mapping through the messages array and toggeling all messages of the key selected true or false.
  selectedBoxFunction = () => {
    let selectedBoxes = this.state.messages.filter( message => {
      return message.selected
    }).length

    if ( selectedBoxes === this.state.messages.length ) {
      this.setState( { 
        message: this.state.messages.map( message => {
          message.selected = false
          return message
        })
      })
    } else {
      this.setState( {
        message: this.state.messages.map( message => {
          message.selected = true
          return message
        })
      })
    }
  }

  markReadFunction = () => {
    let messageIds = [];

    let selectedMessages = this.state.messages.filter( message => message.selected ) 
    selectedMessages.forEach( message => {
      message.selected = true
      messageIds.push(message.id)
    } )

    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds,
        command: 'read',
        read: true
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState( this.state.messages.concat( selectedMessages.map( message => {
      message.read = true
      return message
    } ) ) )
  }

  markUnreadFunction = () => {
    let messageIds = [];

    let selectedMessages = this.state.messages.filter( message => message.selected )
    selectedMessages.forEach( message => {
      message.selected = false
      messageIds.push(message.id)
    } )

    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds,
        command: 'read',
        read: false
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState( this.state.messages.concat( selectedMessages.map( message => {
      message.read = false
      return message
    } ) ) )
  }

  disableReadButton = () => {
    let selectedMessages = this.state.messages.filter( message => message.selected )
    let readStatusArray = selectedMessages.map( message => {
      return message.read ? true : false
    })
    return readStatusArray.includes( true ) || readStatusArray.length === 0 ? 'disabled' : ''
  }

  disableUnreadButton = () => {
    let selectedMessages = this.state.messages.filter( message => message.selected )
    let readStatusArray = selectedMessages.map( message => {
      return message.read ? true : false
    })
    return readStatusArray.includes( false ) || readStatusArray.length === 0 ? 'disabled' : ''
  }

  disabledDeleteMessageButton = () => {
    let selectedMessages = this.state.messages.filter( message => message.selected )
    let readStatusArray = selectedMessages.map( message => {
      return message.selected ? true : false
    })
    return readStatusArray.includes( false ) || readStatusArray.length === 0 ? 'disabled' : ''
  }

  deleteMessage = () => {
    let { messages } = this.state;

    let messageIds = messages.filter( message => message.selected ).map( m => m.id )

    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds,
        command: 'delete'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState( { messages: messages.filter( message => !message.selected ) } )
  }

  disabledApplyLabelMenu = () => {
    let selectedMessages = this.state.messages.filter( message => message.selected ).length
    return selectedMessages === 0 ? 'disabled' : ''
  }

  disabledRemoveLabelMenu = () => {
    let selectedMessages = this.state.messages.filter( message => message.selected ).length
    return selectedMessages === 0 ? 'disabled' : ''
  }

  applyLabelFunc = (label) => {
    if(label === 'Apply label') return 
    let selectedMessages = this.state.messages.filter( message => message.selected ).map( m => m.id )

    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: selectedMessages,
        label: label,
        command: 'addLabel'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState( this.state.messages.concat( this.state.messages.map( message => {
      if ( message.labels.includes(label) ) return message
      if ( message.selected ) message.labels.push(label)
      return message
    } ) ) )
  }

  removeLabelFunc = (label) => {
    if(label === 'Remove label') return
    let selectedMessages = this.state.messages.filter( message => message.selected ).map( m => m.id )

    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: selectedMessages,
        label: label,
        command: 'removeLabel'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.setState( this.state.messages.concat( this.state.messages.map( message => {
      if ( message.selected ) {
        message.labels = message.labels.filter(innerLabel => innerLabel !== label)
      }
      return message
    } ) ) )
  }

  toggleComposeForm = () => {
    this.setState( { display: !this.state.display } )
  }

  addMessage = (message) => {
    fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        subject: message.subject,
        body: message.body
      })
    })
    .then( () => {
      this.state.display = false
      this.getMessages()
    })
  }

  getMessages = async () => {
    const results = await fetch('http://localhost:8082/api/messages');
    const messages = await results.json();
    this.setState({messages});
    
  }

  render() {
    return (
      <div className="App">
        {/* all the toolbar methods and props being passed to the Toolbar Component */}
        <Toolbar 
          messages={ this.state.messages }
          selectedBox={ this.selectedBox }
          selectedBoxFunction={ this.selectedBoxFunction }
          markReadFunction={ this.markReadFunction }
          markUnreadFunction={ this.markUnreadFunction }
          disableReadButton={ this.disableReadButton }
          disableUnreadButton={ this.disableUnreadButton }
          disabledDeleteMessageButton={ this.disabledDeleteMessageButton }
          deleteMessage={ this.deleteMessage }
          disabledApplyLabelMenu={ this.disabledApplyLabelMenu }
          disabledRemoveLabelMenu={ this.disabledRemoveLabelMenu }
          applyLabelFunc={ this.applyLabelFunc }
          removeLabelFunc={ this.removeLabelFunc }
          toggleComposeForm={ this.toggleComposeForm }
        />
        { this.state.display ? <ComposeForm addMessage={ this.addMessage }/> : false}
        {/* all the MessageList props and methods being passed to the MessageList component */}
        <MessageList 
          messages={ this.state.messages }
          starredMessage={ this.starredMessage }
          selectedMessage={ this.selectedMessage }
          readMessage={ this.readMessage }
        />
      </div>
    );
  }
}

export default App;
