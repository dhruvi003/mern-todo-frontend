import React, { useState } from 'react';
import '../App.css'

function TaskItem({ task, onDelete, onEdit, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.title);
  const [priority, setPriority] = useState(task.priority); 
  const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ''); 

  const handleSave = () => {
    onEdit(task._id, text, priority, dueDate); 
    setIsEditing(false);
  };

  return (
    <li className="task-item" style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggleComplete(task._id)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleSave}
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
        </>
      ) : (
        <>
          <span className={`task-title ${task.isCompleted ? 'line-through' : 'none'}`}>{task.title}</span>
          <span className="task-priority">Priority:{task.priority}</span> 
          {task.dueDate && <span className="task-due-date">Due:{new Date(task.dueDate).toLocaleDateString()}</span>} 
        </>
      )}
      {isEditing ? (
        <button className='save-btn' onClick={handleSave}>Save</button>
      ) : (
        <button className='edit-btn' onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button className="delete-btn" onClick={() => onDelete(task._id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
