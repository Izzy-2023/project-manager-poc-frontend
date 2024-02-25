import React, { useEffect, useState } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  const handleCreateTask = () => {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newTaskName })
    })
    .then(res => res.json())
    .then(data => {
      setTasks([...tasks, data]);
      setNewTaskName('');
    })
    .catch(err => console.error(err));
  };

  const handleDeleteTask = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setTasks(tasks.filter(task => task._id !== id));
    })
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="text"
        placeholder="Enter task name"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <button onClick={handleCreateTask}>Create Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.name} <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
