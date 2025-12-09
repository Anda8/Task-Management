// src/api.js
const handleRes = async (res) => {
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API error ${res.status}: ${txt}`);
  }
  return res.json();
};

// baseUrl example: 'https://abcd-1234.mockapi.io'
export const getProjects = async (baseUrl) => {
  const res = await fetch(`${baseUrl}/projects`);
  return handleRes(res); // returns array
};

export const getTasks = async (baseUrl) => {
  const res = await fetch(`${baseUrl}/tasks`);
  return handleRes(res); // returns array
};

// Optional helpers if you later want to POST (not required by assignment)
export const createProject = async (baseUrl, project) => {
  const res = await fetch(`${baseUrl}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });
  return handleRes(res);
};

export const createTask = async (baseUrl, task) => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return handleRes(res);
};
