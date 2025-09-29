const getTasksFromLocalStorage = () => {
    const localTasks = JSON.parse(window.localStorage.getItem('localTasks'));
    return localTasks ? localTasks : [];
}

const setTasksInLocalStorage = (tasks) => {
    window.localStorage.setItem('localTasks', JSON.stringify(tasks));
}

const getNewTaskId = () => {
    const tasks = getTasksFromLocalStorage();
    const lastId = tasks[tasks.length - 1]?.id;
    return lastId ? lastId + 1 : 1;
}

const taskDone = (task) => {
    const getTitleTaskDone = document.querySelector(`#task-${task.id} > div > .title-task`);
    const getBtnTaskDone = document.querySelector(`#task-${task.id} > .btn-done`);

    const taskFinished = getBtnTaskDone.classList.toggle('finished');
    if (taskFinished) {
        getTitleTaskDone.classList.add('checked');
        getBtnTaskDone.innerHTML = `<img src="/assets/icons/Checked.svg" width="32px" heigh="32px" alt="Tarefa concluída">`;
        task.checked = true;
    } else {
        getTitleTaskDone.classList.remove('checked');
        getBtnTaskDone.innerHTML = 'Concluir';
        task.checked = false;
    }
    setTasksInLocalStorage(getTasksFromLocalStorage().map(t => t.id === task.id ? task : t));
    tasksProgress();
}

const createTasks = (task) => {
    const todoList = document.getElementById('tasks-list');
    const li = document.createElement('li');
    li.id = `task-${task.id}`;
    li.innerHTML = `
            <div>
                <p class="title-task">${task.name}</p>
                <p class="data"><span class="tag">${task.tag}</span>${task.date}</p>
            </div>`;
    const btn = document.createElement('button');
    btn.textContent = 'Concluir';
    btn.classList.add('btn-done');
    btn.onclick = () => taskDone(task);

    if (task.checked) {
        li.querySelector('.title-task').classList.add('checked');
        btn.classList.add('finished');
        btn.innerHTML = `<img src="/assets/icons/Checked.svg" width="32px" heigh="32px" alt="Tarefa concluída">`;
    }

    li.appendChild(btn);
    todoList.appendChild(li);
}

const taskDataFromForm = (event) => {
        event.preventDefault();
        const getTaskName = document.getElementById('get-task-name').value;
        const getId = getNewTaskId();
        const getTaskTag = document.getElementById('get-task-tag').value;
        const dateCriation = `Criado em: ${new Date().toLocaleDateString('pt-BR')}`;

        if(!getTaskName || !getTaskTag) return alert('Por favor, preencha todos os campos!');

        return { name: getTaskName, id: getId, tag: getTaskTag, date: dateCriation, checked: false };
}

const renderTasks = (tasks) => {
    document.getElementById('tasks-list').innerHTML = '';
    tasks.forEach((task) => createTasks(task));
    tasksProgress();
}


const tasksProgress = () => {
    const tasks = getTasksFromLocalStorage();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.checked).length;
    const progress = document.getElementById('progress');
    
    progress.textContent = `${completedTasks} de ${totalTasks} tarefas concluídas`;
}

const deleteTasksDone = () => {
    const tasks = getTasksFromLocalStorage();
    const tasksUpdated = tasks.filter(task => !task.checked);

    setTasksInLocalStorage(tasksUpdated);
    document.getElementById('tasks-list').innerHTML = '';
    renderTasks(tasksUpdated);
}

window.onload = () => {
    const tasks = getTasksFromLocalStorage();
    const form = document.getElementById('create-task-form');

    form.addEventListener('submit', (event) => {
        const taskDataForm = taskDataFromForm(event);
        if (!taskDataForm) return;

        createTasks(taskDataForm);
        form.reset(event);

        const tasksNow = getTasksFromLocalStorage();
        setTasksInLocalStorage([...tasksNow, taskDataForm]);
        tasksProgress();
    })

    renderTasks(tasks);
};