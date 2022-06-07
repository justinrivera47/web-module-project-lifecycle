import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
    message: '',
    input: '',
  }

  fetchTodo = () => {
    axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state,
        todos: res.data.data,
        message: res.data.message
      })
    })
    .catch(err => {
      this.setState({
        ...this.state,
        message: err.response.data.message
      })
    })
  }

  componentDidMount = () => {
    this.fetchTodo()
  }

  handleAddTodo = (todo) => {
    axios.post(URL, todo)
    .then(res => console.log(res))
    .catch(err => console.log({err}))
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      input: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <ul>
          {
            this.state.todos.map((todo) => {
              return <li key={todo.id}>{todo.name}{todo.completed ? <span> ✓</span> : <span></span>}</li>
            })
          }
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input 
          value={this.state.input}
          placeholder='add new todo'
          onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
