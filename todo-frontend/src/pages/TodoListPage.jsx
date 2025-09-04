import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos, removeTodo } from '../features/todos/TodoSlice';
import CreateTodo from './CreateTodo';
import EditTodos from './EditTodos';



const TodoListPage = () => {
  const dispatch = useDispatch();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showModel, setShowModel] = useState(false);


  const fetchTodos = async () => {
    try {
      const resultAction = await dispatch(getTodos());
      const data = resultAction.payload;
      setTodos(data);
    } catch (err) {
      setError(err.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  const handleDelete = async (id) => {
    try {
      await dispatch(removeTodo(id));
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err.message);
      alert("Delete failed");
    }
  };

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  }
  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setEditModalOpen(true);
  };

  // Close modal
  const handleCloseEdit = () => {
    setEditModalOpen(false);
    setSelectedTodo(null);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg animate-fadeIn'>
      <h2 className='text-2xlfont-serif mb-4 text-center text-blue-600'>All Pending Todos</h2>
      {loading && <p className='text-gray-500 text-center'>Loading..</p>}
      {error && <p className='text-red-500 text-center'>{error}</p>}

      <ul className="space-y-3">
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow-sm">
            <span className='text-gray-800 font-mono'>{todo.title}</span>
            <button onClick={() => handleEditClick(todo)} className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'>
              Edit
              </button>

            {editModalOpen && (
              <EditTodos
                todo={selectedTodo}
                onClose={handleCloseEdit}
              />
            )}
            <button
              onClick={() => handleDelete(todo.id)}
              className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowModel(true)} className='mt-5 px-4 bg-green text-blue rounded-3xl bg-pink-600  h-14 '>Create Todo</button>
      {/* Show model */}
      {showModel && (<CreateTodo onClose={() => setShowModel(false)} onAdd={handleAddTodo} />)

      }
    </div>
  );
};

export default TodoListPage;
