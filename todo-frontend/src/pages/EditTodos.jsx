import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo } from '../features/todos/TodoSlice';

const EditTodos = ({ todo, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description,
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editTodo({ id: todo.id, ...formData }));
      onClose();
    } catch (err) {
      console.error("Error updating todo: ", err.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded shadow-lg w-96 animate-scale">
        <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 mb-4 w-full"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodos;
