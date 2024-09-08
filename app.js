document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskList = document.getElementById('task-list');
  const themeToggle = document.getElementById('theme-toggle');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to add task to DOM
  const addTaskToList = (task) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
      <div>
        <h3>${task.name}</h3>
        <p>Due: ${task.date}</p>
        <p>Priority: ${task.priority}</p>
      </div>
      <button class="delete-task">Delete</button>
    `;

    taskList.appendChild(taskElement);

    // Add delete functionality
    taskElement.querySelector('.delete-task').addEventListener('click', () => {
      taskList.removeChild(taskElement);
      tasks = tasks.filter(t => t.name !== task.name);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  };

  // Load existing tasks from localStorage
  tasks.forEach(addTaskToList);

  // Form submission to add a new task
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = {
      name: taskForm['task-name'].value,
      date: taskForm['task-date'].value,
      priority: taskForm['task-priority'].value,
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    addTaskToList(task);
    taskForm.reset();
  });

  // Dark mode toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
});
