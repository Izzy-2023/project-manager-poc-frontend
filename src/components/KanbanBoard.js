import React, { useState, useEffect } from 'react';
import Project from './Projects'
import Task from './Tasks';

function KanbanBoard() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    fetch('/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  const handleCreateProject = () => {
    fetch('/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newProjectName })
    })
    .then(res => res.json())
    .then(data => {
      setProjects([...projects, data]);
      setNewProjectName('');
    })
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Kanban Board</h1>
      <input
        type="text"
        placeholder="Enter project name"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <button onClick={handleCreateProject}>Create Project</button>
      {projects.map(project => (
        <Project key={project._id} project={project} />
      ))}
    </div>
  );
}

export default KanbanBoard;
