// Selecionar elementos do DOM
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const prioritySelect = document.getElementById('prioritySelect');
const addBtn = document.getElementById('addBtn');

const altaPrioridadeList = document.getElementById('altaPrioridade');
const mediaPrioridadeList = document.getElementById('mediaPrioridade');
const baixaPrioridadeList = document.getElementById('baixaPrioridade');

const totalTasksSpan = document.getElementById('totalTasks');
const totalTarefasSpan = document.getElementById('totalTarefas');
const totalHobbiesSpan = document.getElementById('totalHobbies');

// Array para armazenar as tarefas
let tasks = [];

// Carregar tarefas do localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adicionar nova tarefa
function addTask() {
    const taskName = taskInput.value.trim();
    const category = categorySelect.value;
    const priority = prioritySelect.value;

    if (taskName === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        category: category,
        priority: priority,
        createdAt: new Date().toLocaleString('pt-BR')
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    // Limpar input
    taskInput.value = '';
    taskInput.focus();
}

// Deletar tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Renderizar tarefas
function renderTasks() {
    // Limpar listas
    altaPrioridadeList.innerHTML = '';
    mediaPrioridadeList.innerHTML = '';
    baixaPrioridadeList.innerHTML = '';

    // Separar tarefas por prioridade
    const altaTasks = tasks.filter(task => task.priority === 'alta');
    const mediaTasks = tasks.filter(task => task.priority === 'media');
    const baixaTasks = tasks.filter(task => task.priority === 'baixa');

    renderTasksByPriority(altaTasks, altaPrioridadeList);
    renderTasksByPriority(mediaTasks, mediaPrioridadeList);
    renderTasksByPriority(baixaTasks, baixaPrioridadeList);

    updateStats();
}

// Renderizar tarefas por prioridade
function renderTasksByPriority(tasksList, listElement) {
    if (tasksList.length === 0) {
        listElement.innerHTML = '<li class="empty-message">Nenhuma tarefa neste nível</li>';
        return;
    }

    tasksList.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div class="task-content">
                <div class="task-name">${task.name}</div>
                <span class="task-category">
                    ${task.category === 'tarefas' ? '📌 Tarefa' : '🎮 Hobby'}
                </span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️ Deletar</button>
        `;
        listElement.appendChild(li);
    });
}

// Atualizar estatísticas
function updateStats() {
    const totalCount = tasks.length;
    const tarefasCount = tasks.filter(task => task.category === 'tarefas').length;
    const hobbiesCount = tasks.filter(task => task.category === 'hobbies').length;

    totalTasksSpan.textContent = totalCount;
    totalTarefasSpan.textContent = tarefasCount;
    totalHobbiesSpan.textContent = hobbiesCount;
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Carregar tarefas ao iniciar
loadTasks();