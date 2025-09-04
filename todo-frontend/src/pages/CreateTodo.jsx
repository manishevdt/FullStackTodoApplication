import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todos/TodoSlice';

const CreateTodo = ({onClose,onAdd}) => {
const dispatch = useDispatch();
const [formData, setFormData] = useState({title:'' , description: ' '});
const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
}
const handleSubmit = async(e) =>{
    e.preventDefault
 try{
const resultAction=  await dispatch(addTodo(formData));
  onAdd(resultAction.payload); // list ,ay update
  onClose(); // model band
 } catch (err) {
    console.error("Error adding todo: ", err.message);
 }

}
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className='bg-white p-5 rounded shadow-lg w-96 animate-scale'>
            <h2 className='text-xl font-bold mb-4'> Add New Todo</h2>
            <input
          name="title"
          placeholder="Title"
          className="border p-2 mb-4 w-full"
          onChange={handleChange}
          value={formData.title}
        />

        {/* Description input */}
        <input
          name="description"
          placeholder="Description"
          className="border p-2 mb-4 w-full"
          onChange={handleChange}
          value={formData.description}
        />
            <div className='flex justify-end gap-3'>
             
                <button onClick={onClose} className='bg-blue-500 text-white px-4 py-2 rounded-full text-sm'>
                    Cancel
                </button>
                <button onClick={handleSubmit} className='bg-blue-500 text-white px-4 py-2 rounded-full text-sm'>
                   Done
                </button>
              </div>
         </div>
       </div>
  )
}

export default CreateTodo
