import React from 'react'
import { ToDoForm } from './ToDoForm'
import { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'
import { ToDo } from './ToDo';
import { EditToDoForm } from './EditToDoForm';

import axios from 'axios';
uuidv4();

export const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const storedItems = JSON.parse(localStorage.getItem('todos')) || [];

  const loadData = () => {
    fetch('http://localhost:8000/all')
    .then(res => {return res.json()})
    .then(data => {
        const d = data;
        if(storedItems.length !== 0)
        {
            for(let si of storedItems){
                axios.post('http://localhost:8000/add',  {...si})
                .catch(err => {console.log(err);})
                d.push(si);
            }
            localStorage.removeItem('todos');
        }
        setTodos(d);
        setTimeout(() => {
          loadData();
        }, "1000");
    })
    .catch(err => {
        console.log(err.message);
        })
}

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

  useEffect(() => {
    axios.get(`http://localhost:8000/all`, { headers: {'Content-Type': 'application/json'}})
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        alert('Failed to fetch todos ' + error.response.data.message);
      });
  }, []);

// useEffect(() => {
//     loadData();
// }, []);


const addTodo = async (todo, category) => {
  console.log(todo, category);
  try {
    const response = await axios.post(
      `http://localhost:8000/add`,
      { task: todo, completed: false, isEdited: false, categoryID: category },
      { headers: { 'Content-Type': 'application/json' } }
    );
    setTodos([...todos, response.data]);
  } catch (error) {
    alert('Server is down');
    setTimeout(() => {
      addTodo(todo, category);
    }, "1000");
    const h = storedItems;
    h.push({ task: todo, categoryID: category });
    localStorage.setItem('todos', JSON.stringify(h));
  }
};

  const deleteTodo = async(id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/delete/${id}`);
        console.log(response.data);
        setTodos(response.data);
    } catch (error) {
        alert('Failed to delete todo from list:' + error);
    }
};


  const deleteCheckedTodos = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };


  const editTodo = async (id) => {
    console.log(id);
    try {
      const response = await axios.patch(`http://localhost:8000/editTodo/${id}`, {
        isEdited: true, completed:false, id:id
      }, { headers: {'Content-Type': 'application/json'}});
      const updatedTodo = response.data;
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Failed to edit todo from list:', error);
    }
  };
  
  const editTask = async (task, id) => {
    console.log(id);
    try {

      const response = await axios.patch(`http://localhost:8000/editTask/${id}`, {task: task, isEdited: false, id: id}, { headers: {'Content-Type': 'application/json'}});
      const updatedTodo = response.data;
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Failed to edit task:', error);
    }
  };
  

  const toggleComplete = async (id) => {
    console.log(id);
    try {
      const response = await axios.patch(`http://localhost:8000/editTodo/${id}`, {
        isEdited:false,
        completed: !todos.find(todo => todo.id === id).completed,
        id:id
      });
      const updatedTodo = response.data;
      const newTodos = todos.map(todo => (todo.id === id ? updatedTodo : todo));
      setTodos(newTodos);
    } catch (error) {
      console.error('Failed to toggle completion:', error);
    }
  };
  

 // const filtered = filterIncompleted ? todos.filter(todo => !todo.completed) : todos;

  const exportData = () =>{
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify([todos])
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  return (
    <div className='todo-list'>
      <h1>Your To Do List</h1>
    <ToDoForm addTodo={addTodo}/>
    <button type='button' className='export-btn' onClick={exportData}>Export Data</button>
    <button type='button' className='delete-btn' onClick={deleteCheckedTodos}>Bulk Delete</button>
    {todos.map((todo, index) => (todo.isEdited ? 
    (<EditToDoForm key={todo.id} task={todo} editTodo={editTask}/>) :
    (<ToDo task={todo} key={index} 
    deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete}/>)))}
    </div>
  ) 
}
