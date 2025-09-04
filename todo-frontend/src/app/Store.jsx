import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/todos/TodoSlice';


const store = configureStore({
    reducer: {
        todos : todoReducer,
    }
}) 

export default store;