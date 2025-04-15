document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const taskName = document.getElementById('taskName').value;
    if (taskName) {
        fetch('backend/task.php', {
            method: 'POST',
            body: new URLSearchParams({
                task_name: taskName
            })
        })
        .then(response => response.text())
        .then(data => {
            loadTasks();
            document.getElementById('taskName').value = ''; // Clear input
        });
    }
});

// Load tasks
function loadTasks() {
    fetch('backend/task.php?action=get_tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `${task.task_name} <button onclick="deleteTask(${task.id})">Delete</button>`;
                taskList.appendChild(li);
            });
        });
}

// Delete task
function deleteTask(id) {
    fetch('backend/task.php', {
        method: 'POST',
        body: new URLSearchParams({
            delete_task_id: id
        })
    })
    .then(response => response.text())
    .then(data => loadTasks());
}

// Load tasks on page load
loadTasks();
