import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type ITodo = { 
  // Our todo should have the title and completed fields and the id field to 
  id: number;
  title: string;
  completed: boolean;
}

type ITodos = {
  todos: ITodo[], // Our Todos is an array of Todo
}

function App() {

  const [todos, setTodos] = React.useState<ITodos>({todos: []});
  const addTodos = (title: string) => {
    setTodos({
      todos: [
        {title, completed:false, id:todos.todos.length+1},
        ...todos.todos
      ]
    })
  }

  const deleteTodos = (id: number) => {
    setTodos({
      todos: todos.todos.filter(t => t.id !== id)
    })
  }

  const toggleTodos = (id: number) => {
    setTodos({
      todos: todos.todos.map(t => t.id == id ? {...t, completed: !t.completed} : t)
    })
  }

  return (
    <div className="App">
          <h1>Mike's Todo App</h1>
          <AddTodoComponent addTodos={addTodos}></AddTodoComponent>
          <TodosComponent todos={todos} toggleTodos={toggleTodos} deleteTodos={deleteTodos}></TodosComponent>
    </div>
  );
}

const TodosComponent: React.FC<{
  todos: ITodos,
  toggleTodos: (id:number) => void,
  deleteTodos: (id:number) => void
}> = ({todos, toggleTodos, deleteTodos}) => {
    const deleteTodo = (id: number) => {
      if (window.confirm(`Are you sure you want to delete todo?`)) {
        deleteTodos(id);
      }
    }
    return(
      <div className='section__todos'>
        <h2>Todos</h2>
        {todos.todos.length ? 
        <ul className= "todos">
          {todos.todos.map(todo => (
            <li key={todo.id}>
              <span style={{textDecoration: todo.completed? 'line-through': 'none'}}>{todo.title}</span>
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => toggleTodos(todo.id)} />
              <button onClick={() => {deleteTodo(todo.id)}}>X</button>
            </li>
          ))}
        </ul> :<div>No todos yet!</div>}
      </div>
    )

}

const AddTodoComponent = ({addTodos} : {addTodos: (text: string) => void}) => {
  const [todo, setTodo] = React.useState<string>("");
  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!todo) {
      alert("Please enter a todo");
    } else {
      addTodos(todo);
      setTodo("");
    }
  };
  return (
    <div className="add_todo">
      <form className="add_form">
        <input
          className='add_form_field'
          value={todo}
          onChange={e => {setTodo(e.target.value)}} />
        <button onClick={submit} className='add_form_button'>Add</button>
      </form>
    </div>
  );
};


export default App;
