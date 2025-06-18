const newTaskInput = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
// key for local storage of tasks
const LOCAL_STORAGE_KEY = 'todoListTasks';

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(listItem => {
        const taskText = listItem.querySelector('.task-content').textContent;
        const isCompleted = listItem.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    console.log('Tasks saved to local storage:', tasks);
}

function loadTasks() {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
        try {
            const tasks = JSON.parse(storedTasks);
            console.log('Tasks loaded from local storage:', tasks);

            // Clear any existing tasks 
            taskList.innerHTML = '';

            tasks.forEach(task => {
                renderTask(task.text, task.completed);
            });
        } catch (e) {
            console.error('Error parsing tasks from local storage:', e);
        }
    } else {
        console.log('No tasks found in local storage.');
    }
}

function renderTask(taskText, isCompleted = false) {
    // 1. Create a new list item element
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');

    // 2. Create a span for the task text
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskContent.classList.add('task-content');

    // 3. Create a 'Complete' button
    const completeButton = document.createElement('button');
    completeButton.textContent = isCompleted ? 'Uncomplete' : 'Complete';
    completeButton.classList.add('complete-button'); 

    // 4. Create a 'Delete' button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button'); 
    
    // Toggle between Complete and uncompleted states
    completeButton.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        if (listItem.classList.contains('completed')) {
            completeButton.textContent = 'Uncomplete';
        } else {
            completeButton.textContent = 'Complete';
        }
        saveTasks();
    });

    deleteButton.addEventListener('click', () => {
        listItem.remove();
        saveTasks();
    });


    // 5. Create a container for buttons to keep them together
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('task-buttons');
    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(deleteButton);

    // 6. Append the task content and button container to the list item
    listItem.appendChild(taskContent);
    listItem.appendChild(buttonContainer);

    // 7. Append the new list item to the main task list
    taskList.appendChild(listItem);

    // Correctly display tasks already marked as completed on reload
    if (isCompleted) {
        listItem.classList.add('completed');
    }
}



function addNewTaskHandler() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        renderTask(taskText); 
        newTaskInput.value = ''; 
        saveTasks(); 
    } else {
        alert('Please enter a valid task');
    }
}

addTaskButton.addEventListener('click', addNewTaskHandler);

// Adds tasks by pressing 'Enter' 
newTaskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addNewTaskHandler();
    }
});

// Load tasks when the page finishes loading 
window.addEventListener('DOMContentLoaded', loadTasks);
