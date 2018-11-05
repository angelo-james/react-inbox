import React, { Component } from 'react'

class Message extends Component {
  state = {
      read: false,
      selected: false,
      starred: false,
      subject: ''
  }
  componentDidMount(){
    this.setState({...this.props.message})
  }

  handleFavorite = () => {
    this.setState({
      starred: !this.state.starred
    })
  }

  handleChecked = () => {
    this.setState({
      selected: !this.state.selected
    })
  }

  render(){
    const { read, selected, starred, subject } = this.state;
    return (

      <div className={`row message ${ read ? 'read' : 'unread' } ${ selected ? 'selected' : '' }`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={ selected } onClick={ this.handleChecked }/>
            </div>
            <div className="col-xs-2">
              <i onClick={ this.handleFavorite }
                className={`star fa fa-star${ starred ? '' : '-o' }`}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <a href="#">
            { subject }
          </a>
        </div>
      </div>
    )
  }
  // let labels = message.labels.map( ( label ) => {
  //   return (
  //     <span className="label label-warning">{ label }</span>
  //   )
  // })
}

export default Message;