import React, { useState } from 'react';

export const CategoryForm = ({ addCategory}) => {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory(description, deadline);
      setDeadline('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add Category:', error);
    }
  };

  return (
    <form className='category-form' onSubmit={handleSubmit}>
      <input
        type='text'
        className='description-input'
        placeholder='Write description here'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type='text'
        className='deadline-input'
        placeholder='Write time limit here'
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type='submit' className='category-btn'>
        Add
      </button>
    </form>
  );
};

export default CategoryForm;
