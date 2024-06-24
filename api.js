document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchGames();
    }
});

async function fetchGames(searchTerm) {
    const apiKey = '9fa7ef1b92634c39ad1f407e41de0ca3';
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
}

function renderGames(games) {
    const gamesList = document.getElementById('gamesList');

    gamesList.innerHTML = '';

    if (games.length === 0) {
        gamesList.innerHTML = '<p>No games found.</p>';
        return;
    }

    games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');
        gameElement.innerHTML = `
            <h2>${game.name}</h2>
            <img src="${game.background_image}" alt="${game.name}">
            <p>Released: ${game.released}</p>
            <p>Rating: ${game.rating}</p>
            <div class="stars" data-game-id="${game.id}">
            <span class="star" data-value="1">★</span>
            <span class="star" data-value="2">★</span>
            <span class="star" data-value="3">★</span>
            <span class="star" data-value="4">★</span>
            <span class="star" data-value="5">★</span>
        </div>
        <br>
        <br>
        <button class="save-button">Salvar</button>
        `;
        const saveButton = gameElement.querySelector('.save-button');
        saveButton.addEventListener('click', () => {
            saveGameAndRedirect(game);
            saveButton.disabled = true;
            saveButton.textContent = 'Salvo';
        });
        
        gamesList.appendChild(gameElement);
  
        
  
    });

    const stars = document.querySelectorAll('.stars .star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const gameId = star.parentElement.dataset.gameId;
            const value = star.dataset.value;
            saveAlert.style.display = 'block';
            console.log(`Jogo ${gameId} salvo com ${value} estrelas.`);
            
        
            star.classList.add('scale-up');
           
            setTimeout(() => {
                star.classList.remove('scale-up');
            }, 200); 
        });
    });
}
 


async function getGameTrailers(gameId, apiKey) {
    const response = await fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`);
    const data = await response.json();
    return data.results;
}

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('BotaoApagar');
const filterButton = document.getElementById('filter-btn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const trailerButton = document.getElementById('sec-trailer');
const body = document.body;
const saveAlert = document.getElementById('saveAlert');



searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {

        const games = await fetchGames(searchTerm);
        renderGames(games);
    } else {
        alert('pesquisa invalida, favor digitar novamente');
        searchInput.focus();
    }

});



clearButton.addEventListener('click', function () {
    searchInput.value = '';
    document.getElementById('gamesList').innerHTML = '';
});



filterButton.addEventListener('click', async function () {
    alert('Essa funcionalidade ainda está em construção, Favor esperar')
});





function disableFilterButton() {
    filterButton.disabled = true;
};


 themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        gamesList.classList.toggle('dark-mode');
        toggleIcon();
    });

    function toggleIcon() {
        const moonIcon = themeToggleBtn.querySelector('.fa-moon');
        const sunIcon = themeToggleBtn.querySelector('.fa-sun');

        moonIcon.style.display = body.classList.contains('dark-mode') ? 'none' : 'inline-block';
        sunIcon.style.display = body.classList.contains('dark-mode') ? 'inline-block' : 'none';
    };



    function loadSavedGames() {
        const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
        savedGames.forEach(game => displayGame(game));
    }
    
    function saveGameAndRedirect(game) {
        let savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
        savedGames.push(game);
        localStorage.setItem('savedGames', JSON.stringify(savedGames));
        
        window.location.href = 'Biblioteca.html';
    }
    
    
 
