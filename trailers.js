async function getGameTrailers(gameId, apiKey) {
  const response = await fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`);
  const data = await response.json();
  return data.results;
}

async function loadSavedTrailers() {
  const apiKey = '9fa7ef1b92634c39ad1f407e41de0ca3';  
  const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
  const savedTrailerList = document.getElementById('saved-trailer-list');

  for (const game of savedGames) {
      const trailers = await getGameTrailers(game.id, apiKey);
      if (trailers.length > 0) {
          const trailer = trailers[0];  
          const trailerElement = document.createElement('div');
          trailerElement.classList.add('game');

          trailerElement.innerHTML = `
              <img src="${game.background_image}" alt="${game.name}">
              <h2>${game.name}</h2>
              <p><strong>Rating:</strong> ${game.rating}</p>
              <p><strong>Released:</strong> ${game.released}</p>
              <video width="320" height="240" controls>
                  <source src="${trailer.data.max}" type="video/mp4">
                  Your browser does not support the video tag.
              </video>
          `;

          savedTrailerList.appendChild(trailerElement);
      } else {
          const noTrailerElement = document.createElement('div');
          noTrailerElement.classList.add('game');

          noTrailerElement.innerHTML = `
              <img src="${game.background_image}" alt="${game.name}">
              <h2>${game.name}</h2>
              <p><strong>Rating:</strong> ${game.rating}</p>
              <p><strong>Released:</strong> ${game.released}</p>
              <p><strong>Trailer: </strong> ${game.trailer}</p>
          `;

          savedTrailerList.appendChild(noTrailerElement);
      }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSavedTrailers();
});


async function getGameTrailers(gameId, apiKey) {
  const response = await fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`);
  const data = await response.json();
  return data.results;
}
