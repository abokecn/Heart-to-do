const translations = {
    en: {
        title: "Todo List",
        taskAdded: "Task added!",
        addPlaceholder: "Add a new task...",
        addButton: "Add Task",
        remaining: "Remaining",
        completed: "Completed",
        export: "Export Data",
        import: "Import Data",
        delete: "Delete",
        edit: "Edit",
        language: "中文",
        importSuccess: "Data imported successfully!",
        importError: "Invalid file format",
        editPrompt: "Edit task:"
    },
    zh: {
        title: "待办事项",
        taskAdded: "任务已添加！",
        addPlaceholder: "添加新任务...",
        addButton: "添加任务",
        remaining: "剩余任务",
        completed: "已完成",
        export: "导出数据",
        import: "导入数据",
        delete: "删除",
        edit: "编辑",
        language: "English",
        importSuccess: "数据导入成功！",
        importError: "文件格式错误",
        editPrompt: "编辑任务："
    }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function t(key) {
    return translations[currentLang][key] || key;
}

function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', currentLang);
    applyTranslations();
    renderTodoList();
}

function applyTranslations() {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        el.textContent = t(key);
    });
    
    document.getElementById('todoInput').placeholder = t('addPlaceholder');
    document.querySelector('.add-btn').textContent = t('addButton');
}