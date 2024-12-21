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
    const taskList = document.getElementById("task-list");
    const todoList = document.getElementById("todo-list");
    const doneList = document.getElementById("done-list");
    const blockedList = document.getElementById("blocked-list");

    if (taskList) {
        taskList.innerHTML = "";
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'incomplete') return !task.completed && task.status !== 'done';
            if (filter === 'done') return task.status === 'done';
            return true;
        });
        filteredTasks.forEach(task => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";
            li.innerHTML = `
        <span onclick="toggleComplete(${task.id})">${task.text}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        <button class="done-btn filter-btn" onclick="markAsDone(${task.id})">Mark as Done</button>
      `;
            taskList.appendChild(li);
        });
        return;
    }

    if (todoList && doneList && blockedList) {
        todoList.innerHTML = "";
        doneList.innerHTML = "";
        blockedList.innerHTML = "";

        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'incomplete') return !task.completed && task.status !== 'done';
            if (filter === 'done') return task.status === 'done';
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";
            li.innerHTML = `
                <span onclick="toggleComplete(${task.id})">${task.text}</span>
                <button class="delete-btn filter-btn" onclick="deleteTask(${task.id})">Delete</button>
                <button class="done-btn filter-btn" onclick="markAsDone(${task.id})">Mark as Done</button>
                <button class="block-btn filter-btn" onclick="markAsBlocked(${task.id})">Block</button>
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

function markAsDone(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== 'done') {
        task.status = 'done';
        task.completed = true;
    }
    renderTasks();
}

function markAsBlocked(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== 'blocked') { // Обновляем только если статус еще не 'blocked'
        task.status = 'blocked'; // Обновление статуса задачи
        task.completed = false; // Убираем отметку о выполнении, если была
    }
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
