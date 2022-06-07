import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <ul>
      {
        this.props.todos.map((todo) => {
          return <Todo todo={todo} key={todo.id} toggleCompleted={this.props.toggleCompleted}/>
        })
      }
    </ul>
    )
  }
}
