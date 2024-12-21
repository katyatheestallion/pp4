let tasks = [];
let filter = 'all';

function addTask() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    status: 'todo'
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const todoList = document.getElementById("todo-list");
  const doneList = document.getElementById("done-list");
  const blockedList = document.getElementById("blocked-list");

  todoList.innerHTML = "";
  doneList.innerHTML = "";
  blockedList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleComplete(${task.id})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;

    if (task.status === 'todo') {
      todoList.appendChild(li);
    } else if (task.status === 'done') {
      doneList.appendChild(li);
    } else if (task.status === 'blocked') {
      blockedList.appendChild(li);
    }
  });
}

function toggleComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  task.completed = !task.completed;
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  renderTasks();
}

function filterTasks(status) {
  filter = status;
  renderTasks();
}


document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');
  const doneList = document.getElementById('done-list');
  const blockedList = document.getElementById('blocked-list');

  const todoSortable = new Sortable(todoList, {
    group: 'shared', 
    animation: 150,
    onEnd: (evt) => {
      const taskId = parseInt(evt.item.querySelector('span').getAttribute('onclick').match(/\d+/)[0]);
      const task = tasks.find(t => t.id === taskId);
      if (evt.to.id === 'todo-list') {
        task.status = 'todo';
      } else if (evt.to.id === 'done-list') {
        task.status = 'done';
      } else if (evt.to.id === 'blocked-list') {
        task.status = 'blocked';
      }
      renderTasks(); 
    }
  });

  const doneSortable = new Sortable(doneList, {
    group: 'shared',
    animation: 150,
    onEnd: (evt) => {
      const taskId = parseInt(evt.item.querySelector('span').getAttribute('onclick').match(/\d+/)[0]);
      const task = tasks.find(t => t.id === taskId);
      if (evt.to.id === 'todo-list') {
        task.status = 'todo';
      } else if (evt.to.id === 'done-list') {
        task.status = 'done';
      } else if (evt.to.id === 'blocked-list') {
        task.status = 'blocked';
      }
      renderTasks();
    }
  });

  const blockedSortable = new Sortable(blockedList, {
    group: 'shared',
    animation: 150,
    onEnd: (evt) => {
      const taskId = parseInt(evt.item.querySelector('span').getAttribute('onclick').match(/\d+/)[0]);
      const task = tasks.find(t => t.id === taskId);
      if (evt.to.id === 'todo-list') {
        task.status = 'todo';
      } else if (evt.to.id === 'done-list') {
        task.status = 'done';
      } else if (evt.to.id === 'blocked-list') {
        task.status = 'blocked';
      }
      renderTasks();
    }
  });
});