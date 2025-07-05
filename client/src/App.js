import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Fetch all todos
  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async () => {
    if (text.trim() === '') return;
    await axios.post('http://localhost:5000/todos', { text });
    setText('');
    fetchTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  return (
  <div className="container">
    <h1>To-Do List</h1>
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter a task"
    />
    <button onClick={addTodo}>Add</button>

    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          {todo.text}
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

}

export default App;

