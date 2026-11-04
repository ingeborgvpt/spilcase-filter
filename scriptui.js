
"use strict";

const genreTekst = game =>
    Array.isArray(game.genre)
        ? game.genre.join(", ")
        : game.genre;

const filterToggle = document.getElementById('filter-toggle');
const spilContainer = document.getElementById('products-container');

function displaySpil(spilToDisplay) {
    spilContainer.innerHTML = "";

    if (spilToDisplay.length === 0) {
        spilContainer.innerHTML =
            '<p class="no-products">Ingen spil fundet.</p>';
        return;
    }

    spilToDisplay.forEach(game => {
        const spilCard = document.createElement("div");
        spilCard.className = "product-card";

        const antal = game.antalSpillere || [];

        const spillerTekst = antal.length
            ? `${Math.min(...antal)}-${Math.max(...antal)} personer`
            : "Ikke angivet";

        const tid = game.spilletid !== undefined
            ? game.spilletid + " min"
            : "Varierende";

        const niveau =
            game.sværhedsgrad ??
            game.svaerhedsgrad ??
            game.sværhed ??
            "Ikke angivet";

        spilCard.innerHTML = `
            <img
                class="product-image"
                src="${game.billede}"
                alt="${game.titel}"
            >

            <div class="product-info">
                <h3 class="product-title">${game.titel}</h3>

                <span class="product-rating">
                    ★ ${game.rating ?? "4.7"}
                </span>

                <div class="product-details">
                    <p>
                        <span class="detail-icon">👥</span>
                        ${spillerTekst}
                    </p>

                    <p>
                        <span class="detail-icon">◷</span>
                        ${tid}
                    </p>

                    <p>
                        <span class="detail-icon">▥</span>
                        ${niveau}
                    </p>
                </div>
            </div>

            <span class="heart-icon">♡</span>
        `;

        spilCard.addEventListener("click", () => {
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


document.getElementById('dialog-close').addEventListener('click', () => dialog.close());


filterToggle.addEventListener('click', () => {
    window.location.href = "filter.html";
});

