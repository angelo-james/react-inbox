import React from 'react'

const Message = ( { message, starredMessage, selectedMessage, readMessage } ) => {
  let labels = message.labels.map( ( label, index )  => {
    return (
      <span key={ index } className="label label-warning">{ label }</span>
    )
  })

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
          onClick={ () => readMessage( message )}
        >
            { labels }
          <a href="#">
            { message.subject }
          </a>
        </div>
      </div>
  )
}

export default Message;