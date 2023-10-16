import React from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import './styles/button.css';
import './styles/input.css';
import './styles/todoList.css';
import './styles/todo.css';
function App() {
  return (
    <div className='App'>
      <TodoList />
    </div>  
  );
}

export default App;