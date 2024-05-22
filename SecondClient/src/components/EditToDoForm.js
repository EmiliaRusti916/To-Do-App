import React, { useState } from 'react';

export const EditToDoForm = ({ editTodo, task }) => {
  const [todo, setTodo] = useState(task.task || ''); // Ensure todo is initialized with a defined value

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editTodo(todo, task.id);
      setTodo('');
    } catch (error) {
      console.error('Failed to edit todo from form:', error);
    }
  };

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input
        type='text'
        className='todo-input'
        placeholder='Update task here'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type='submit' className='todo-btn'>
        Update
      </button>
    </form>
  );
};
