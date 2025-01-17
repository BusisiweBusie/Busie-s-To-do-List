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
        li.textContent = taskText;

        // Toggle "checked" when clicking a task
        li.addEventListener("click", function () {
            this.classList.toggle("checked");
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

        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
        inputBox.value = ''; // Clear input field
        saveTasks();
    }

    // Save tasks to Local Storage
    function saveTasks() {
        let tasks = [];
        document.querySelectorAll("#list-container li").forEach(li => {
            tasks.push({
                text: li.textContent.replace("\u00d7", "").trim(),
                checked: li.classList.contains("checked")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load saved tasks from Local Storage
    function loadTasks() {
        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => {
            let li = document.createElement("li");
            li.textContent = task.text;

            if (task.checked) {
                li.classList.add("checked");
            }

            li.addEventListener("click", function () {
                this.classList.toggle("checked");
                saveTasks();
            });

            let deleteBtn = document.createElement("span");
            deleteBtn.innerHTML = "\u00d7";
            deleteBtn.classList.add("delete");

            deleteBtn.addEventListener("click", function (event) {
                event.stopPropagation();
                li.remove();
                saveTasks();
            });

            li.appendChild(deleteBtn);
            listContainer.appendChild(li);
        });
    }

    loadTasks(); // Load existing tasks

    // Attach addTask function to button
    document.querySelector("button").addEventListener("click", addTask);
});

