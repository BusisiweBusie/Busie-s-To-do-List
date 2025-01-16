document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const newTaskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");
    const filterInput = document.getElementById("filter");
    const filteredTasks = document.getElementById("filtered-tasks");

    // Fetch tasks from server
    async function fetchTasks() {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        displayTasks(tasks);
    }

    // Display tasks
    function displayTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.textContent = task;
            const deleteBtn = document.createElement('a');
            deleteBtn.className = 'secondary-content';
            deleteBtn.innerHTML = '<i class="fa fa-remove"></i>';
            deleteBtn.setAttribute('data-id', index);
            deleteBtn.addEventListener('click', deleteTask);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    // Add task
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newTask = newTaskInput.value;
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: newTask })
        });
        const result = await response.json();
        fetchTasks();
        newTaskInput.value = '';
    });

    // Delete task
    async function deleteTask(e) {
        const id = e.target.getAttribute('data-id');
        const response = await fetch(`/tasks/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        fetchTasks();
    }

    // Filter tasks
    filterInput.addEventListener('input', () => {
        const filter = filterInput.value.toLowerCase();
        const tasks = taskList.getElementsByTagName('li');
        Array.from(tasks).forEach(task => {
            const item = task.textContent.toLowerCase();
            if (item.includes(filter)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    });

    // Initial fetch of tasks
    fetchTasks();
});

