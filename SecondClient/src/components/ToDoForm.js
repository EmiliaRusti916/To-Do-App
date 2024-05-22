import React, { useState } from 'react';

export const ToDoForm = ({ addTodo, setFilter }) => {
  const [todo, setTodo] = useState('');
  const [categoryID, setCategoryID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTodo(todo, categoryID);
      setTodo('');
      setCategoryID('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleFilter = (e) => {
    setFilter((prevFilter) => !prevFilter);
  };

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input
        type='text'
        className='todo-input'
        placeholder='Write task text here'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <input
        type='text'
        className='category-input'
        placeholder='Write category id here'
        value={categoryID}
        onChange={(e) => setCategoryID(e.target.value)}
      />
      <button type='submit' className='todo-btn'>
        Add
      </button>
      <button type='button' className='filter-btn' onClick={handleFilter}>
        Filter
      </button>
    </form>
  );
};

export default ToDoForm;
