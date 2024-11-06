class ThemeManager {
    constructor() {
        this.body = document.getElementById('body');
        this.mainContainer = document.getElementById('mainContainer');
        this.tableContainer = document.getElementById('tableContainer');
        this.tableHeader = document.getElementById('tableHeader');
        this.searchInput = document.getElementById('searchInput');
        this.statsCards = [
            document.getElementById('statsCard1'),
            document.getElementById('statsCard2'),
            document.getElementById('statsCard3')
        ];
        this.themeIcon = document.querySelector('#themeToggle i');
        
        this.initTheme();
        this.setupListeners();
    }

    setTheme(isDark) {
        if (isDark) {
            this.body.classList.add('bg-gray-900', 'text-white');
            this.body.classList.remove('bg-gray-100', 'text-black');
            this.tableContainer.classList.add('bg-gray-800');
            this.tableContainer.classList.remove('bg-white');
            this.tableHeader.classList.add('bg-gray-700');
            this.tableHeader.classList.remove('bg-gray-100');
            this.searchInput.classList.add('bg-gray-800', 'border-gray-700', 'text-white');
            this.searchInput.classList.remove('bg-white', 'border-gray-300');
            this.statsCards.forEach(card => {
                card.classList.add('bg-gray-800');
                card.classList.remove('bg-white');
            });
            this.themeIcon.classList.remove('fa-moon');
            this.themeIcon.classList.add('fa-sun');
        } else {
            this.body.classList.remove('bg-gray-900', 'text-white');
            this.body.classList.add('bg-gray-100', 'text-black');
            this.tableContainer.classList.remove('bg-gray-800');
            this.tableContainer.classList.add('bg-white');
            this.tableHeader.classList.remove('bg-gray-700');
            this.tableHeader.classList.add('bg-gray-100');
            this.searchInput.classList.remove('bg-gray-800', 'border-gray-700', 'text-white');
            this.searchInput.classList.add('bg-white', 'border-gray-300');
            this.statsCards.forEach(card => {
                card.classList.remove('bg-gray-800');
                card.classList.add('bg-white');
            });
            this.themeIcon.classList.add('fa-moon');
            this.themeIcon.classList.remove('fa-sun');
        }
    }

    toggleTheme() {
        const isDark = localStorage.getItem('theme') !== 'dark';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.setTheme(isDark);
    }

    initTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
        this.setTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    setupListeners() {
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
    }
}