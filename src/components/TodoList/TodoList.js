import React, { useState, useEffect } from "react";
import Todo from "./Todo";

function TodoList(props) {
  const [todoListState, setTodoListState] = useState({
    todos: [],
    inputValue: "",
    error: "",
  });

  useEffect(() => {
    // Odczytaj listę zadań z localStorage po załadowaniu komponentu
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodoListState({
      ...todoListState,
      todos: storedTodos,
    });
  }, []); // Pusta tablica zależności, więc efekt będzie wywołany tylko raz po montażu komponentu

  const handleInputChange = (event) => {
    const { value } = event.target;
    setTodoListState({
      ...todoListState,
      inputValue: value,
    });
  };

  const handleButtonClick = () => {
    const { todos } = todoListState;
    if (!inputValue) return;
    if (todos.some((todo) => todo === inputValue)) {
      setTodoListState({
        ...todoListState,
        error: "To zadanie już istnieje",
        inputValue: "",
      });
      return;
    }
    const updatedTodos = [...todos, inputValue];
    setTodoListState({
      error: "",
      todos: updatedTodos,
      inputValue: "",
    });

    // Zapisz zaktualizowaną listę zadań do localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleTodoRemove = (todoValue) => {
    const updatedTodos = todos.filter((todo) => todo !== todoValue);
    setTodoListState({
      ...todoListState,
      todos: updatedTodos,
    });

    // Zapisz zaktualizowaną listę zadań do localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const { error, todos, inputValue } = todoListState;

  return (
    <div className="TodoList">
      <h1>Moja aplikacja todo</h1>
      <input
        className="Input"
        name="todo input"
        placeholder="Co będziemy dziś robić?"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="Button" onClick={handleButtonClick}>
        Dodaj
      </button>
      {!!error && <p>{error}</p>}
      {todos.map((todo) => (
        <Todo
          className="Todo"
          key={todo}
          todo={todo}
          handleCloseClick={handleTodoRemove}
        />
      ))}
    </div>
  );
}

export default TodoList;