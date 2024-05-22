import React from 'react'
import { CategoryForm } from './CategoryForm'
import { useState, useEffect } from 'react'
import { Category } from './Category';

import axios from 'axios';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/allcategories`, { headers: {'Content-Type': 'application/json'}})
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        alert('Failed to fetch categories ' + error.response.data.message);
      });
  }, []);

  const addCategory = async(description, deadline) => {
    try {
      const response = await axios.post(`http://localhost:8000/addcategories`, {description: description, deadline:deadline }, { headers: {'Content-Type': 'application/json'}});
      setCategories([...categories, response.data]);
      alert('Category added successfully');
    } catch (error) {

      alert('Failed to add category: ' + error.response.data.message);
    }
      
  };
  

  const deleteCategory = async(id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/deletecategories/${id}`);
        console.log(response.data);
        setCategories(response.data);
    } catch (error) {
        alert('Failed to delete category from list:' + error);
    }
};


  const editCategory = async (id) => {
    console.log(id);
    try {
      const response = await axios.patch(`http://localhost:8000/editTodo/${id}`, {
        
      }, { headers: {'Content-Type': 'application/json'}});
      const updatedCategory = response.data;
      setCategories(categories.map(category => (category.id === id ? updatedCategory : category)));
    } catch (error) {
      console.error('Failed to edit todo from list:', error);
    }
  };
  


  return (
    <div className='category-list'>
      <h1 id="title">Categories</h1>
    <CategoryForm addCategory={addCategory}/>
    {categories.map((category, index) => 
    (<Category category={category} key={index} 
    deleteCategory={deleteCategory} editCategory={editCategory}/>))}
    </div>
  )

 
  
}
