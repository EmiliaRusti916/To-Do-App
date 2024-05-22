import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Category = ({category, editCategory, deleteCategory}) => {
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      alert('Failed to delete category from Category: ' + error.response.data.message);
    }
  };
  return (
    <div className='category'>
      <p>{["Description: ", category.description, " |   Time Limit:  ", category.deadline, " days |   ID:  ", category.id]}</p>
      <div> 
      <FontAwesomeIcon icon={faPenToSquare} style={{color: "#f7f7f7",}} className='fa-edit' onClick={() => editCategory(category.id)} />
      <FontAwesomeIcon icon={faTrash} style={{color: "#f7f7f7",}} className='fa-delete' onClick={() => handleDelete(category.id)}/>
      </div>
    </div>
  )
}
