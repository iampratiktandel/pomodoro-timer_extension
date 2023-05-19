let tasks = [];

/** set add task button */
const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', () => addTask());

/** get tasks from chrome storage and render them */
chrome.storage.sync.get(["tasks"], (res) => {
    tasks = res.tasks ? res.tasks : [];
    renderTasks();
});

/** save added tasks to chrome storage */
function saveTasks() {
    chrome.storage.sync.set({
        tasks
    });
}

/** render task and add event listeners */
function renderTask(taskNum) {
    const taskRow = document.createElement('div');

    /** create task input element and set value */
    const text = document.createElement('input');
    text.type = 'text';
    text.placeholder = 'Enter a task';
    text.value = tasks[taskNum];
    /** add listener for value change */
    text.addEventListener('change', () => {
        tasks[taskNum] = text.value;
        saveTasks();
    });

    /** create delete button element and set value */
    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'X';
    /** add listener for button click */
    deleteBtn.addEventListener('click', () => {
        deleteTask(taskNum);
    });

    taskRow.appendChild(text);
    taskRow.appendChild(deleteBtn);

    const taskContainer = document.getElementById('task-container');
    taskContainer.appendChild(taskRow);
}

/** render all tasks in container */
function renderTasks() {
    const taskContainer = document.getElementById('task-container');
    taskContainer.textContent = '';
    tasks.forEach((taskText, taskNum) => {
        renderTask(taskNum);
    });
}

/** add task */
function addTask() {
    const taskNum = tasks.length;
    tasks.push('');
    renderTask(taskNum);
    saveTasks();
}

/** delete task */
function deleteTask(taskNum) {
    tasks.splice(taskNum, 1);
    renderTasks();
    saveTasks();
}