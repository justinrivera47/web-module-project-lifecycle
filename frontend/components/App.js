import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

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
  
  toggleCompleted = (id) => {
    console.log(id)
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
       <TodoList todos={this.state.todos} toggleCompleted={this.toggleCompleted}/>
       <Form postNewTodo={this.postNewTodo}/>
      </div>
    )
  }
}
