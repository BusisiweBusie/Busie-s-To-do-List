document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");

    function addTask() {
        const taskText = inputBox.value.trim(); // Remove extra spaces

        if (taskText === '') {
            alert("You must write something!");
            return;
        }

        let li = document.createElement("li");

        // Create checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");

        // Create task text span
        let taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        // Toggle "checked" when clicking the checkbox
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                taskSpan.classList.add("checked");
            } else {
                taskSpan.classList.remove("checked");
            }
            saveTasks();
        });

        // Create delete button
        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7"; // Unicode for "×"
        deleteBtn.classList.add("delete");

        // Remove task when delete button is clicked
        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent clicking li
            li.remove();
            saveTasks();
        });

        // Append elements to li
        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
        inputBox.value = ''; // Clear input field
        saveTasks();
    }

    // Save tasks to Local Storage
    function saveTasks() {
        let tasks = [];
        document.querySelectorAll("#list-container li").forEach(li => {
            const checkbox = li.querySelector(".task-checkbox");
            const taskSpan = li.querySelector("span");
            tasks.push({
                text: taskSpan.textContent,
                checked: checkbox.checked
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load saved tasks from Local Storage
    function loadTasks() {
        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => {
            let li = document.createElement("li");

            // // Create checkbox
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("task-checkbox");
            checkbox.checked = task.checked; 

            // Create task text span
            let taskSpan = document.createElement("span");
            taskSpan.textContent = task.text;
            if (task.checked) {
                taskSpan.classList.add("checked");
            }

            checkbox.addEventListener("change", function () {
                if (checkbox.checked) {
                    taskSpan.classList.add("checked");
                } else {
                    taskSpan.classList.remove("checked");
                }
                saveTasks();
            });

            // Create delete button
            let deleteBtn = document.createElement("span");
            deleteBtn.innerHTML = "\u00d7";
            deleteBtn.classList.add("delete");

            deleteBtn.addEventListener("click", function (event) {
                event.stopPropagation();
                li.remove();
                saveTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(taskSpan);
            li.appendChild(deleteBtn);
            listContainer.appendChild(li);
        });
    }

    loadTasks(); // Load existing tasks

    // Attach addTask function to button
    document.querySelector("button").addEventListener("click", addTask);
});
