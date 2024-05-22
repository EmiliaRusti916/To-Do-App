import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
export const ToDo = ({task, deleteTodo, editTodo, toggleComplete}) => {
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      alert('Failed to delete todo from ToDo: ' + error.response.data.message);
    }
  };
  return (
    <div className='todo'>
      <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? "completed" : "incompleted"}`}>{task.task}</p>
      <p>{task.categoryID}</p>
      <div> 
      <FontAwesomeIcon icon={faPenToSquare} style={{color: "#f7f7f7",}} className='fa-edit' onClick={() => editTodo(task.id)} />
      <FontAwesomeIcon icon={faTrash} style={{color: "#f7f7f7",}} className='fa-delete' onClick={() => handleDelete(task.id)}/>
      </div>
    </div>
  )
}
