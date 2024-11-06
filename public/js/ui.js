class UIManager {
    static async displayRanking(players) {
        const tbody = document.getElementById('rankingBody');
        tbody.innerHTML = '';
        
        for (const [position, player] of Object.entries(players)) {
            if (!player.a_enable) continue;

            const status = await ChessAPI.getStatus(0, player.a_index);
            const tr = document.createElement('tr');
            tr.className = 'transition-colors hover:bg-opacity-10 hover:bg-gray-500 cursor-pointer';
            
            // Ranking
            const tdRanking = document.createElement('td');
            tdRanking.className = 'px-6 py-4 font-semibold';
            tdRanking.innerHTML = `<span class="flex items-center gap-2">
                #${position}${parseInt(position) <= 3 ? this.getTrophyIcon(parseInt(position)) : ''}
            </span>`;
            
            // Nome
            const tdNome = document.createElement('td');
            tdNome.className = 'px-6 py-4';
            tdNome.textContent = player.a_nick;
            
            // Rating com status
            const tdRating = document.createElement('td');
            tdRating.className = 'px-6 py-4';
            tdRating.innerHTML = `
                <div class="flex items-center">
                    <span class="font-mono">${player.a_rating_atual}</span>
                    ${status}
                </div>
            `;

            // Categoria
            const ageCategory = this.getAgeCategory(player.idade);
            const tdCategoria = document.createElement('td');
            tdCategoria.className = 'px-6 py-4';
            tdCategoria.innerHTML = `
                <span class="px-3 py-1 rounded-full text-sm ${ageCategory.class}" title="${ageCategory.title}">
                    ${ageCategory.content}
                </span>
            `;
            
            tr.appendChild(tdRanking);
            tr.appendChild(tdNome);
            tr.appendChild(tdRating);
            tr.appendChild(tdCategoria);
            tbody.appendChild(tr);
        }
    }

    static getAgeCategory(age) {
        if (age < 12) {
            return {
                class: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
                title: 'Sub-12',
                content: 'Sub 12'
            };
        } else if (age < 15) {
            return {
                class: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
                title: 'Sub-15',
                content: 'Sub 15'
            };
        } else if (age < 18) {
            return {
                class: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
                title: 'Sub-18',
                content: 'Sub 18'
            };
        } else {
            return {
                class: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
                title: 'Absoluto',
                content: 'Absoluto'
            };
        }
    }

    static getTrophyIcon(position) {
        const colors = {
            1: 'text-yellow-500',
            2: 'text-gray-400',
            3: 'text-yellow-600'
        };
        return `<i class="fas fa-trophy ${colors[position]}"></i>`;
    }
}