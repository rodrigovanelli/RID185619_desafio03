const tasks = [
    { name: 'Implementar tela de listagem de tarefas', tag: 'frontend', data: 'Criado em: 21/08/2024', checked: false },
    { name: 'Criar endpoint para cadastro de tarefas', tag: 'backend', data: 'Criado em: 21/08/2024', checked: false },
    { name: 'Implementar protótipo da listagem de tarefas', tag: 'ux', data: 'Criado em: 21/08/2024', checked: true },
];

const todoList = document.getElementById('lista-de-tarefas');

const renderTasks = (tasks) => {
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <p class="title-task">${task.name}</p>
                <p class="data"><span class="etiqueta">${task.tag}</span>${task.data}</p>
            </div>`;
        const btn = document.createElement('button');
        btn.textContent = 'Concluir';
        btn.classList.add('btn-concluir');

        if (task.checked) {
            const titleTaskDone = li.querySelector('.title-task');
            titleTaskDone.classList.add('checked');
            btn.disabled = true;
        }

        li.appendChild(btn);
        todoList.appendChild(li);
    });
}

renderTasks(tasks);