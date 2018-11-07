import React, { Component } from 'react';
import './App.css';

import Toolbar from './Components/Toolbar';
import MessageList from './Components/MessageList'

class App extends Component {

  state = {
    messages: [
      {
        "id": 1,
        "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        "read": false,
        "starred": true,
        "labels": ["dev", "personal"]
      },
      {
        "id": 2,
        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        "read": false,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": ["dev"]
      },
      {
        "id": 4,
        "subject": "We need to program the primary TCP hard drive!",
        "read": true,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 5,
        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        "read": false,
        "starred": false,
        "labels": ["personal"]
      },
      {
        "id": 6,
        "subject": "We need to back up the wireless GB driver!",
        "read": true,
        "starred": true,
        "labels": []
      },
      {
        "id": 7,
        "subject": "We need to index the mobile PCI bus!",
        "read": true,
        "starred": false,
        "labels": ["dev", "personal"]
      },
      {
        "id": 8,
        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        "read": true,
        "starred": true,
        "labels": []
      }
    ]
  }
  //starredMessage method is checking if the method is true or false and setting the key of starred opposite to what it is currently set as
  starredMessage = ( message ) => {
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
    let selectedMessages = this.state.messages.filter( message => message.selected ) 
    this.setState( this.state.messages.concat( selectedMessages.map( message => {
      message.read = true
      return message
    }) ))
  }

  markUnreadFunction = () => {
    let selectedMessages = this.state.messages.filter( message => message.selected ) 
    this.setState( this.state.messages.concat( selectedMessages.map( message => {
      message.read = false
      return message
    }) ))
  }

  disableReadButton = () => {
    let selectedMessages = this.state.messages.filter( message => message.selected )
    let readStatusArray = selectedMessages.map( message => {
      return message.read === true
    })
    return readStatusArray.includes( true ) || readStatusArray.length === 0 ? 'disabled' : ''
  }

  disableUnreadButton = () => {
    let selectedMessages = this.state.messages.filter( message => message.selected )
    let readStatusArray = selectedMessages.map( message => {
      return message.read === false
    })
    return readStatusArray.includes( false ) || readStatusArray.length === 0 ? '' : 'disabled'
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
        />
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
