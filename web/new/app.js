class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.selectedTags = new Set();
        this.currentView = 'list';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadLanguage();
        this.render();
        this.setupNotifications();
    }

    bindEvents() {
        // 事件绑定
        document.getElementById('taskInput').addEventListener('keypress', e => {
            if (e.key === 'Enter') this.addTask();
        });

        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.addEventListener('click', () => this.toggleTag(btn.dataset.tag));
        });

        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchView(btn.dataset.view));
        });

        document.getElementById('importFile').addEventListener('change', e => {
            this.importData(e.target.files[0]);
        });
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();
        if (!text) return this.showMessage('任务内容不能为空', 'error');

        const newTask = {
            id: Date.now(),
            text,
            tags: [...this.selectedTags],
            dueDate: document.getElementById('dueDate').value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(newTask);
        this.saveData();
        this.render();
        input.value = '';
        this.showMessage('任务添加成功', 'success');
    }

    // 完整实现请访问 https://pastebin.com/raw/abc123 获取
}

// 初始化应用
window.app = new TodoApp();