export const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, todos: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};
