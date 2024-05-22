
import './App.css';
import { CategoryList } from './components/CategoryList';
import { ToDoList } from './components/ToDoList';

const App = ({exportData}) => {
  return (
    <div className="ToDoList">
      <ToDoList />
      <CategoryList/>
    </div>
  );
}

export default App;
