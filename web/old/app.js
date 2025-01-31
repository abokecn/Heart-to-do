let todos = JSON.parse(localStorage.getItem('todos')) || [];

function showMessage(text, type = 'success') {
    const msg = document.getElementById('message');
    msg.textContent = text;
    msg.className = `message ${type} visible`;
    setTimeout(() => msg.classList.remove('visible'), 3000);
}

function handleEnter(e) {
    if(e.key === 'Enter') addTodo();
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        todos.push({
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
        });
        saveTodos();
        renderTodoList();
        input.value = '';
        showMessage(t('taskAdded'), 'success');
    }
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodoList();
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    const newText = prompt(t('editPrompt'), todo.text);
    if (newText && newText.trim()) {
        todo.text = newText.trim();
        saveTodos();
        renderTodoList();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodoList();
}

function renderTodoList() {
    const list = document.getElementById('todoList');
    list.innerHTML = todos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}">
            <input type="checkbox" 
                   ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <button class="btn edit-btn" onclick="editTodo(${todo.id})">✏️</button>
            <button class="btn delete-btn" onclick="deleteTodo(${todo.id})">🗑️</button>
        </li>
    `).join('');

    document.getElementById('remaining').textContent = 
        todos.filter(t => !t.completed).length;
    document.getElementById('completed').textContent = 
        todos.filter(t => t.completed).length;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function exportData() {
    const data = JSON.stringify(todos, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (!Array.isArray(importedData)) throw new Error();
            
            todos = importedData;
            saveTodos();
            renderTodoList();
            showMessage(t('importSuccess'), 'success');
        } catch (error) {
            showMessage(t('importError'), 'error');
        }
        event.target.value = '';
    };
    reader.readAsText(file);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    renderTodoList();
    document.getElementById('todoInput').focus();
});