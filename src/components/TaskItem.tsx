import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  // Handler function for edit button
  const handleEdit = () => {
    console.log('Editing task:', task); // Debug: check if this logs
    onEdit(task); // Call the onEdit handler passed from parent
  };

  // Handler function for delete button
  const handleDelete = () => {
    console.log('Deleting task with id:', task.id); // Debug: check if this logs
    onDelete(task.id); // Call the onDelete handler passed from parent
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate.toDateString()}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
