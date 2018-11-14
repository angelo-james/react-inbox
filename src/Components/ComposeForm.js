import React, { Component } from 'react'

export default class ComposeForm extends Component {
  state = {
    subject: '',
    body: ''
  }

  submit = (e) => {
    e.preventDefault()
    this.props.addMessage(this.state)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      
      <form className="form-horizontal well" onSubmit={ this.submit }>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>
              Compose Message
            </h4>
          </div>
        </div>

        <div className="form-group">
          <label 
            for="subject" 
            className="col-sm-2 control-label"
          >
            Subject
          </label>
          <div className="col-sm-8">
            <input 
              onChange={ this.handleChange }
              type="text" 
              className="form-control" 
              id="subject" 
              placeholder="Enter a subject" 
              name="subject"
            >
            </input>
          </div>
        </div>

        <div className="form-group">
          <label 
            for="body" 
            className="col-sm-2 control-label"
          >
            Body
          </label>
          <div className="col-sm-8">
            <textarea
              onChange={ this.handleChange }
              name="body" 
              id="body" 
              className="form-control"
            >
            </textarea>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <button
              type="submit" 
              value="Send" 
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      
    )
  }
}