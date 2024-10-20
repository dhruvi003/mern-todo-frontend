import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onEdit, onToggleComplete }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={(id) => {
            console.log('Delete task with ID:', id); 
            onDelete(id);
          }}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
