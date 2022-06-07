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

  postNewTodo = (todo) => {
    axios.post(URL, {name: todo})
    .then(res => {
      console.log(res)
      this.setState({
        message: res.data.message,
        todos: [...this.state.todos, res.data.data],
        input: ''
      })
    })
    .catch(err => {
      this.setState({
        message: err.message
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.postNewTodo(this.state.input)
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
