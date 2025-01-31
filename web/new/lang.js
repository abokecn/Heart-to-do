const translations = {
    en: {
        title: "Todo List",
        language: "中文",
        export: "Export",
        import: "Import",
        listView: "List View",
        calendarView: "Calendar View",
        addPlaceholder: "Add a new task...",
        tagWork: "Work",
        tagLife: "Life",
        tagStudy: "Study",
        customTag: "Custom Tag",
        addButton: "Add Task",
        stats: "Remaining: {remaining} | Completed: {completed}",
        // ...其他翻译项
    },
    zh: {
        title: "待办事项",
        language: "English",
        export: "导出数据",
        import: "导入数据",
        listView: "列表视图",
        calendarView: "日历视图",
        addPlaceholder: "添加新任务...",
        tagWork: "工作",
        tagLife: "生活",
        tagStudy: "学习",
        customTag: "自定义标签",
        addButton: "添加任务",
        stats: "剩余任务: {remaining} | 已完成: {completed}",
        // ...其他翻译项
    }
};

class I18n {
    constructor() {
        this.lang = localStorage.getItem('lang') || 'zh';
    }

    t(key, params = {}) {
        let text = translations[this.lang][key] || key;
        Object.entries(params).forEach(([k, v]) => {
            text = text.replace(new RegExp(`{${k}}`, 'g'), v);
        });
        return text;
    }

    toggleLanguage() {
        this.lang = this.lang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('lang', this.lang);
        this.updateTexts();
    }

    updateTexts() {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            el.textContent = this.t(key);
        });
    }
}

window.i18n = new I18n();