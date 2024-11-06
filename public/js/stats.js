class StatsManager {
    constructor() {
        this.highestRatingElement = document.getElementById('highestRating');
        this.totalPlayersElement = document.getElementById('totalPlayers');
        this.averageRatingElement = document.getElementById('averageRating');
    }

    updateStats(players) {
        if (!players.length) return;

        const highestRating = Math.max(...players.map(p => p.a_rating_atual));
        const totalPlayers = players.length;
        const averageRating = Math.round(
            players.reduce((acc, p) => acc + p.a_rating_atual, 0) / totalPlayers
        );

        this.highestRatingElement.textContent = highestRating;
        this.totalPlayersElement.textContent = totalPlayers;
        this.averageRatingElement.textContent = averageRating;
    }
}