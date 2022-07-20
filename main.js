class Task {
    constructor(id, task) {
        this.id = id,
        this.task = task
    }
}

const allTasks = [];
const inputElem = document.getElementById('task');
const list = document.getElementById('list');
const clearBtn = document.getElementById('clearBtn');
let taskToEdit = {};

const addToList = (e) => {
    e.preventDefault();   
    const newTask = new Task(Date.now(), inputElem.value);
    console.log(newTask);
    allTasks.push(newTask);
    sessionStorageHandler.setItem(newTask);
    renderList();
    inputElem.value = '';
}

const renderList = () => {
    list.innerHTML = '';  // reset list
    for(let task of allTasks) {
        renderTask(task);
    }
    if(allTasks.length) {
        clearBtn.style.display = 'inline-block';
    } else {
        clearBtn.style.display = 'none';
    }
}

const renderTask = ({ id, task }) => {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');
    const taskNameDiv = document.createElement('div');
    const taskName = document.createElement('p');
    taskName.textContent = `${task}`;
    taskNameDiv.appendChild(taskName);
    const taskActionBtns = document.createElement('div');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa', 'fa-trash');
    deleteIcon.setAttribute('aria-hidden', 'true');
    deleteIcon.id = id;
    deleteIcon.onclick = () => deleteItemList(id);
    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit');
    editIcon.id = id;
    editIcon.onclick = () => editItemList(id);
    taskActionBtns.appendChild(editIcon);
    taskActionBtns.appendChild(deleteIcon);
    listItem.appendChild(taskNameDiv);
    listItem.appendChild(taskActionBtns);
    list.appendChild(listItem);
}
  
const deleteItemList = (id) => {
    allTasks.splice(allTasks.findIndex(x => x.id == id), 1);
    sessionStorageHandler.removeIem(id);
    renderList();
}

const editItemList = (id) => {
    inputElem.value = allTasks.find(x => x.id === id).task;
    const editTaskBtn = document.getElementById('editBtn');
    editTaskBtn.style.display = 'inline-block';
    const createTaskBtn = document.getElementById('createBtn');
    createTaskBtn.style.display = 'none';
    taskToEdit = allTasks.find(x => x.id === id);
}

const editTask = () => {
    const id = taskToEdit.id;
    const task = inputElem.value;
    allTasks.splice(allTasks.findIndex(x => x.id === taskToEdit.id), 1, { id, task });
    renderList();
    inputElem.value = '';
    const editTaskBtn = document.getElementById('editBtn');
    editTaskBtn.style.display = 'none';
    const createTaskBtn = document.getElementById('createBtn');
    createTaskBtn.style.display = 'inline-block';
    sessionStorageHandler.setItem({ id, task });
}

const clearList = () => {
    allTasks.length = 0;
    sessionStorageHandler.clear();
    renderList();
}

const sessionStorageHandler = {
    getItems: () => {
        for (const [ id, task ] of Object.entries(sessionStorage)) {
            allTasks.push({ id, task });
        };
    },
    setItem: ({ id, task }) => {
        sessionStorage.setItem(id, task);
    },
    removeIem: (id) => {
        sessionStorage.removeItem(id);
    },
    clear: () => {
        sessionStorage.clear();
    }
}
sessionStorageHandler.getItems();

if(allTasks.length) {
    renderList();
}