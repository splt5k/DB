class ChessRanking {
    constructor() {
        this.players = [];
        this.filteredPlayers = [];
        this.themeManager = new ThemeManager();
        this.statsManager = new StatsManager();
        this.searchManager = new SearchManager(this.handleSearch.bind(this));
        this.init();
    }

    async init() {
        try {
            this.players = await ChessAPI.getPlayers();
            this.filteredPlayers = this.players;
            this.updateUI();
        } catch (error) {
            console.error('Erro ao inicializar:', error);
        }
    }

    handleSearch(searchTerm) {
        if (!searchTerm) {
            this.filteredPlayers = this.players;
        } else {
            this.filteredPlayers = this.players.filter(player => 
                player.a_nick.toLowerCase().includes(searchTerm)
            );
        }
        this.updateUI();
    }

    updateUI() {
        UIManager.displayRanking(this.filteredPlayers);
        this.statsManager.updateStats(this.players);
    }
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChessRanking();
});