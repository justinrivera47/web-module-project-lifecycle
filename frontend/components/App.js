import React from 'react'
import axios from 'axios'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
    message: '',
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
        todos: [...this.state.todos, res.data.data]
      })
    })
    .catch(err => {
      this.setState({
        message: err.message
      })
    })
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
       <Form postNewTodo={this.postNewTodo}/>
      </div>
    )
  }
}
