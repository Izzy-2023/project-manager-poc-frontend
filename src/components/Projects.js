import React, { useEffect, useState } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  const handleCreateProject = () => {
    fetch('/api/projects', {
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

  const handleDeleteProject = (id) => {
    fetch(`/api/projects/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setProjects(projects.filter(project => project._id !== id));
    })
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Projects</h1>
      <input
        type="text"
        placeholder="Enter project name"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <button onClick={handleCreateProject}>Create Project</button>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            {project.name} <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
