import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [priority, setPriority] = useState(''); 
  const [dueDate, setDueDate] = useState(''); 

  
  useEffect(() => {
    

    async function fetchTasks() {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks');
        console.log('Fetched Tasks:', res.data);
        setTasks(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', { 
        title: text, 
        priority, 
        dueDate 
      });
      console.log('New Task:', res.data);
      setTasks([...tasks, res.data]);
      setText('');
      setPriority(''); 
      setDueDate(''); 
    } catch (error) {
      console.error('Error adding task:', error.response ? error.response.data : error.message);
    }
  };

  const editTask = async (id, newText, newPriority, newDueDate) => {
    if (!newText) return;
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { 
        title: newText,
        priority: newPriority,
        dueDate: newDueDate 
      });
      setTasks(
        tasks.map(task =>
          task._id === id ? { ...task, title: newText, priority: newPriority, dueDate: newDueDate } : task
        )
      );
    } catch (error) {
      console.error('Error editing task:', error.response ? error.response.data : error.message);
    }
  };

  
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error.response ? error.response.data : error.message);
    }
  };

  const toggleComplete = async (id) => {
    const taskToToggle = tasks.find(task => task._id === id);
    if (taskToToggle) {
      try {
        const updatedTask = { ...taskToToggle, isCompleted: !taskToToggle.isCompleted };
        await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
        setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
      } catch (error) {
        console.error('Error toggling task completion:', error.response ? error.response.data : error.message);
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompletion = showCompleted || !task.isCompleted;
    return matchesSearch && matchesCompletion; 
  });

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks"
        />
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          Show Completed
        </label>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button className='add-task-btn' onClick={addTask}>Add Task</button>
      <TaskList
        tasks={filteredTasks} 
        onDelete={deleteTask}
        onEdit={editTask}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
