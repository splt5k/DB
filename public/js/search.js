class SearchManager {
    constructor(onSearch) {
        this.searchInput = document.getElementById('searchInput');
        this.onSearch = onSearch;
        this.setupListeners();
    }

    setupListeners() {
        let searchTimeout;
        this.searchInput.addEventListener('input', (event) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = event.target.value.toLowerCase().trim();
                this.onSearch(searchTerm);
            }, 200); // Reduced debounce time for better responsiveness
        });

        // Add clear search functionality
        this.searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.searchInput.value = '';
                this.onSearch('');
            }
        });
    }
}