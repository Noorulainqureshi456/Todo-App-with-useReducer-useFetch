import { useEffect, useReducer, useState } from "react";
import { todoReducer, initialState } from "../Reduser/TodoReduser";


const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [showInput, setShowInput] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await res.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data.slice(0, 10) });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
      }
    };

    fetchTodos();
  }, []);

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (newTodoText.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      title: newTodoText,
      completed: false,
    };

    dispatch({ type: "ADD_TODO", payload: newTodo });
    setNewTodoText("");
    setShowInput(false);
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const { todos, loading, error } = state;

  return (
    <div className="todo-list">
      <button onClick={handleAddClick}>+ Add Todo</button>

      {showInput && (
        <form onSubmit={handleAddTodo} style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Enter your todo"
            autoFocus
          />
          <button type="submit"> Add</button>
        </form>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleRemove(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
