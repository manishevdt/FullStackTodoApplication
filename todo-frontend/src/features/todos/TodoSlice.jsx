import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "./TodoApi";


export const getTodos = createAsyncThunk('todos/getTodos', fetchTodos);
export const addTodo = createAsyncThunk('todos/addTodo', createTodo);
export const removeTodo = createAsyncThunk('todos/removeTodo', deleteTodo); 
export const editTodo = createAsyncThunk('todos/editTodo', updateTodo);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
   
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
      state.loading = false;
    });

    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.loading = false;
    });

    builder.addCase(editTodo.fulfilled, (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
      state.loading = false;
    });

  
    builder.addMatcher(
      isPending(getTodos, addTodo, removeTodo, editTodo),
      state => {
        state.loading = true;
        state.error = null;
      }
    );

   
    builder.addMatcher(
      isRejected(getTodos, addTodo, removeTodo, editTodo),
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
  }
});

export default todoSlice.reducer;
