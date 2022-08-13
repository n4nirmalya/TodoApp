import React from 'react'

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void
    deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : ''
  const priorityColor = todo.priority === 'high' ? {color:"red"}: todo.priority === 'medium' ? {color:"orange"}:{color:"green"}
  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1 className={checkTodo}>{todo.name}</h1>
        <h3 className={checkTodo}>Assigned To -&gt; <strong style={{color:'green'}}>{todo.assignedTo}</strong></h3>
        <h4 className={checkTodo}>Priority -&gt; <strong
          style={priorityColor}
        >{todo.priority}</strong></h4>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className='Card--button'>
        <button
          onClick={() => updateTodo(todo)}
          className={todo.status ? `hide-button` : 'Card--button__done'}
        >
          Complete
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className='Card--button__delete'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Todo
