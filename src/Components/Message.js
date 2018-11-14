import React, { Component } from 'react'

class Message extends Component { 
  state = {
    show: false
  }
  
  render() {
    let { message, starredMessage, selectedMessage, readMessage } = this.props 

    let labels = message.labels.map( ( label, index )  => {
      return (
        <span key={ index } className="label label-warning">{ label }</span>
      )
    })

    let { show } = this.state

  return (
      <div className={`row message ${ message.read ? 'read' : 'unread' } ${ message.selected ? 'selected' : '' }`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input 
                type="checkbox" 
                checked={ message.selected }
                onChange={ () => selectedMessage( message )}
                />
            </div>
            <div className="col-xs-2">
              <i className={`star fa fa-star${ message.starred ? '' : '-o' }`} onClick={ () => starredMessage( message )}></i>
            </div>
          </div>
        </div>
        <div 
          className="col-xs-11"
          onClick={() => {
            readMessage( message )
            this.setState({ show: !show })
          }}
        >
            { labels }
          <a href="#">
            { message.subject }
          </a>
        {!show ? false : (
          <div>
            { message.body }
          </div>
          )
        }
        </div>
      </div>
  )
  }
}

export default Message;