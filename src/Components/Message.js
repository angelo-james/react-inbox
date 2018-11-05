import React from 'react'

const Message = ( { message } ) => {
  let labels = message.labels.map( ( label ) => {
    return (
      <span className="label label-warning">{ label }</span>
    )
  })

  return (
    <div className={`row message ${ message.read ? 'read' : 'unread' } ${ message.selected ? 'selected' : '' }`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={ message.selected }/>
          </div>
          <div className="col-xs-2">
            <i className={`star fa fa-star${ message.starred ? '' : '-o' }`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        { labels }
        <a href="#">
          { message.subject }
        </a>
      </div>
    </div>
  )
}

export default Message;