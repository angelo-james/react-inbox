import React, { Component } from 'react'

class Toolbar extends Component {
  render() {
    let unreadMessages = this.props.messages.filter( message => !message.read ).length

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{ unreadMessages }</span>
            unread messages
          </p>

          <button 
            onClick={ () => this.props.selectedBoxFunction() }
            className="btn btn-default">
            <i 
              className={`fa fa${ this.props.selectedBox() }-square-o`}
              ></i>
          </button>

          <button 
            onClick={ () => this.props.markReadFunction() }
            className="btn btn-default" 
            disabled={ `${ this.props.disableReadButton() }` }
          >
            Mark As Read
          </button>

          <button 
            onClick={ () => this.props.markUnreadFunction() }
            className="btn btn-default" 
            disabled={ `${ this.props.disableUnreadButton() }` }
          >
            Mark As Unread
          </button>

          <select 
            className="form-control label-select" 
            disabled={ `${ this.props.disabledApplyLabelMenu() }` }
            onChange={ () => this.props.applyLabelFunc( document.querySelectorAll('select')[0].value ) }
          >
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select 
            className="form-control label-select" 
            disabled={ `${ this.props.disabledRemoveLabelMenu() }` }
            onChange={ () => this.props.removeLabelFunc( document.querySelectorAll('select')[0].value ) }
            >
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button 
            className="btn btn-default" 
            disabled={ `${ this.props.disabledDeleteMessageButton() }` }
            >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar