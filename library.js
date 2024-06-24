function loadSavedGames() {
    const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
    const savedGameList = document.getElementById('saved-game-list');

    savedGames.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');

        gameElement.innerHTML = `
            <img src="${game.background_image}" alt="${game.name}">
            <h2>${game.name}</h2>
            <p><strong>Rating:</strong> ${game.rating}</p>
            <p><strong>Released:</strong> ${game.released}</p>
        `;

        savedGameList.appendChild(gameElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSavedGames();
});
