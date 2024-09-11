(function () {
    "use strict";
    // Cache DOM elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Initialize tasks from localStorage
    const loadTasks = () => {
        const savedTasks = localStorage.getItem('todos');
        return savedTasks ? JSON.parse(savedTasks) : [];
    };

    // Save tasks to localStorage
    const saveTasks = (tasks) => {
        localStorage.setItem('todos', JSON.stringify(tasks));
    };

    // Display tasks in the DOM
    const displayTasks = (tasks) => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${task.name}</span>
                <input type="text" class="edit-input" value="${task.name}" data-id="${task.id}" style="display:none;">
                <button class="edit-btn" onclick="toggleEdit(${task.id})">Edit</button>
                <button class="remove-btn" onclick="removeTask(${task.id})">Remove</button>
            `;
            taskList.appendChild(listItem);
        });
    };

    // Add a new task
    const addTask = () => {
        const taskValue = taskInput.value.trim();
        if (!taskValue) {
            alert('Please enter a task.');
            return;
        }

        const tasks = loadTasks();
        const newTask = { id: tasks.length, name: taskValue };
        tasks.push(newTask);
        saveTasks(tasks);
        taskInput.value = '';
        displayTasks(tasks);
    };

    // Toggle between edit and save mode
    window.toggleEdit = (id) => {
        const taskInputField = document.querySelector(`input.edit-input[data-id="${id}"]`);
        const taskSpan = taskInputField.previousElementSibling;

        if (taskInputField.style.display === 'none' || taskInputField.style.display === '') {
            taskInputField.style.display = 'inline';
            taskSpan.style.display = 'none';
            taskInputField.focus();
        } else {
            const newName = taskInputField.value.trim();
            if (newName) {
                const tasks = loadTasks();
                const task = tasks.find(task => task.id === id);
                task.name = newName;
                saveTasks(tasks);
                displayTasks(tasks);
            }
        }
    };

    // Remove a task
    window.removeTask = (id) => {
        let tasks = loadTasks();
        tasks = tasks.filter(task => task.id !== id);
        saveTasks(tasks);
        displayTasks(tasks);
    };

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);

    // Initial display of tasks
    displayTasks(loadTasks());

})();
