class ChessAPI {
    static async getPlayers() {
        const query = `
            SELECT 
                a_index,
                a_enable,
                a_nick,
                a_rating_atual,
                a_confronto_direto,
                a_vitorias,
                a_buc1,
                TIMESTAMPDIFF(YEAR, a_data_nascimento, CURDATE()) AS idade
            FROM
                t_atletas
            ORDER BY 
                a_rating_atual DESC,
                a_confronto_direto DESC,
                a_vitorias DESC,
                a_buc1 DESC,
                idade ASC,
                a_nick ASC
        `;
        const results = await this.executeQuery(query);
        const players = {};
        let position = 1;
        for (const row of results) {
            players[position] = row;
            position++;
        }
        return players;
    }

    static async getPlayerData(id) {
        const query = `SELECT * FROM t_atletas WHERE a_index = ${id}`;
        const results = await this.executeQuery(query);
        return results[0];
    }

    static async getStatus(confrontoId, playerId) {
        const query = confrontoId === 0 
            ? `SELECT 
                a_desafiado, 
                a_desafiante, 
                a_desafiado_pontos, 
                a_desafiante_pontos
               FROM t_confrontos
               WHERE (a_desafiado = ${playerId} OR a_desafiante = ${playerId})
               AND a_resultado IS NOT NULL
               ORDER BY a_index DESC
               LIMIT 1`
            : `SELECT 
                a_desafiado, 
                a_desafiante, 
                a_desafiado_pontos, 
                a_desafiante_pontos
               FROM t_confrontos
               WHERE (a_desafiado = ${playerId} OR a_desafiante = ${playerId})
               AND a_resultado IS NOT NULL
               AND a_index = ${confrontoId}`;

        const results = await this.executeQuery(query);
        
        if (results.length === 0) return '';
        
        const match = results[0];
        const pontos = match.a_desafiado === playerId 
            ? match.a_desafiado_pontos 
            : match.a_desafiante_pontos;

        if (pontos > 0) {
            return '<span style="color: green; font-size:80%;"> ▲</span>';
        } else if (pontos < 0) {
            return '<span style="color: red; font-size:80%;"> ▼</span>';
        }
        return '';
    }

    static async executeQuery(query) {
        try {
            const response = await fetch('/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });
            
            const data = await response.json();
            if (!data.success) throw new Error(data.error);
            return data.results;
        } catch (error) {
            console.error('Erro ao executar query:', error);
            throw error;
        }
    }
}