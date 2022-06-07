import React from 'react'

export default class Form extends React.Component {
  state = {
    input: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.postNewTodo(this.state.input)
    this.setState({input: ''})
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    return (
      <div>
         <form onSubmit={this.handleSubmit}>
          <input 
          value={this.state.input}
          placeholder='add new todo'
          onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
        <button>Clear Completed</button>
      </div>
    )
  }
}
