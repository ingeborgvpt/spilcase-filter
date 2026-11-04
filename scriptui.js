
"use strict";

const genreTekst = game =>
    Array.isArray(game.genre)
        ? game.genre.join(", ")
        : game.genre;

const filterPanel = document.getElementById('filter-panel');
const overlay = document.getElementById('overlay');
const filterToggle = document.getElementById('filter-toggle');
const closeFilter = document.getElementById('close-filter');
const spilContainer = document.getElementById('products-container');

function displaySpil(spilToDisplay) {
    spilContainer.innerHTML = '';

    if (spilToDisplay.length === 0) {
        spilContainer.innerHTML = '<p class="no-products">Ingen spil fundet. Prøv at justere dine filtre.</p>';
        return;
    }

    spilToDisplay.forEach(game => {
        const spilCard = document.createElement('div');
        spilCard.className = 'product-card';

        spilCard.innerHTML = `
           
       <img class="product-image ${game.titel.toLowerCase() === 'codenames' ? 'codenames-image' : ''}"
     src="${game.billede}"
     alt="${game.titel}">
                <h3 class="product-title">${game.titel}</h3>
                <p class="product-description">${genreTekst(game)}</p>

                <div class="product-meta">
                    <span class="product-category">${game.type}</span>
                    <span class="product-price">
                        ${game.spilletid !== undefined ? game.spilletid + ' minutter' : 'Varierende spilletid'}
                    </span>
                </div>
                <button class="product-button">Vis</button>
            </div>
        `;

        spilCard.querySelector('.product-button').addEventListener('click', () => {
            showSpilDialog(game);
        });

        spilContainer.appendChild(spilCard);
    });
}

const dialog = document.getElementById('product-dialog');

function showSpilDialog(game) {
    document.getElementById('dialog-title').textContent = game.titel;
    document.getElementById('dialog-type').textContent = 'Type: ' + game.type;
    document.getElementById('dialog-genre').textContent = 'Genre: ' + genreTekst(game);

    document.getElementById('dialog-players').textContent =
        game.antalSpillere ? 'Antal spillere: ' + game.antalSpillere.join(', ') : 'Antal spillere: Ikke angivet';

    document.getElementById('dialog-time').textContent =
        game.spilletid !== undefined ? 'Spilletid: ' + game.spilletid + ' minutter' : 'Spilletid: Varierende';

    document.getElementById('dialog-producer').textContent =
        'Producent: ' + (game.producent || game.udvikler || 'Ikke angivet');

    dialog.showModal();
}

filterToggle.addEventListener('click', () => {
    window.location.href = "filter.html";
});
closeFilter.addEventListener('click', closeFilterPanel);
overlay.addEventListener('click', closeFilterPanel);

document.getElementById('dialog-close').addEventListener('click', () => dialog.close());

function closeFilterPanel() {
    filterPanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function toggleFilterPanel() {
    filterPanel.classList.toggle('active');
    overlay.classList.toggle('active');

    if (filterPanel.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && filterPanel.classList.contains('active')) {
        closeFilterPanel();
    }
});

filterToggle.addEventListener('click', () => {
    window.location.href = "filter.html";
});

