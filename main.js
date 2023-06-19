 // Function to clear all tasks in a specific list
 function clearTasks(listId) {
  const taskList = document.getElementById(listId);
  taskList.innerHTML = '';
  localStorage.removeItem(listId);
}

// Function to render tasks from local storage
function renderTasks(listId) {
  const taskList = document.getElementById(listId);
  const tasks = JSON.parse(localStorage.getItem(listId)) || [];

  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerText = task;

    taskList.appendChild(taskItem);
  });
}

// Function to save tasks to local storage
function saveTasks(listId, tasks) {
  localStorage.setItem(listId, JSON.stringify(tasks));
}

// Function to add a new task to a specific list
function addTask(listId, inputId) {
  const taskInput = document.getElementById(inputId);
  const taskValue = taskInput.value.trim();

  if (taskValue !== '') {
    const taskList = document.getElementById(listId);
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerText = taskValue;

    taskList.appendChild(taskItem);

    const tasks = JSON.parse(localStorage.getItem(listId)) || [];
    tasks.push(taskValue);
    saveTasks(listId, tasks);

    taskInput.value = '';
  }
}

// Event listeners for adding tasks
document.getElementById('personalTaskInput').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addTask('personalTaskList', 'personalTaskInput');
  }
});

document.getElementById('workTaskInput').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addTask('workTaskList', 'workTaskInput');
  }
});

// Create clear buttons
const personalClearBtn = document.createElement('button');
personalClearBtn.className = 'clearBtn';
personalClearBtn.innerHTML = 'Clear';
personalClearBtn.onclick = function() {
  clearTasks('personalTaskList');
};
document.getElementById('personalTaskList').insertAdjacentElement('afterend', personalClearBtn);

const workClearBtn = document.createElement('button');
workClearBtn.className = 'clearBtn';
workClearBtn.innerHTML = 'Clear';
workClearBtn.onclick = function() {
  clearTasks('workTaskList');
};
document.getElementById('workTaskList').insertAdjacentElement('afterend', workClearBtn);

// Render tasks on page load
renderTasks('personalTaskList');
renderTasks('workTaskList');