import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="app">
      <h1>Todo App with useReducer + useFetch</h1>
      <TodoList />
    </div>
  );
};

export default App;
