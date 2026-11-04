
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

    const niveauIkon = {
    "Let": "billeder/let.png",
    "Mellem": "billeder/mellem.png",
    "Svær": "billeder/svaer.png"
    }[game.sværhedsgrad];


        const spilCard = document.createElement("div");
        spilCard.className = "product-card";

        const antal = game.antalSpillere || [];

        const spillerTekst = antal.length
            ? `${Math.min(...antal)}-${Math.max(...antal)} personer`
            : "Ikke angivet";

        const tid = game.spilletid !== undefined
            ? game.spilletid + " min"
            : "Varierende";


        spilCard.innerHTML = `
            <img
                class="product-image"
                src="${game.billede}"
                alt="${game.titel}"
            >

            <div class="product-info">
                <h3 class="product-title">${game.titel}</h3>

                <span class="product-rating">
                    <span class="carbon--star-filled"> </span> ${game.rating ?? "4.7"}
                </span>

                <div class="product-details">
                    <p>
                       <span class="heroicons--users-20-solid"></span>
                        ${spillerTekst}
                    </p>

                    <p>
                       <span class="akar-icons--clock"></span>
                        ${tid}
                    </p>

         <p>
   <p>
    <img class="niveau-ikon" src="${niveauIkon}" alt="">
    ${game.sværhedsgrad ?? "Ikke angivet"}
</p>
                </div>
            </div>

           <button type="button" class="heart-icon">
        ${favoritter.includes(game.titel) ? "♥" : "♡"}
            </button>
        `;

        spilCard.addEventListener("click", () => {
            showSpilDialog(game);
        });

    spilCard.querySelector(".heart-icon").addEventListener("click", (event) => {
    event.stopPropagation();

    const index = favoritter.indexOf(game.titel);

    if (index === -1) {
        favoritter.push(game.titel);
    } else {
        favoritter.splice(index, 1);
    }

    localStorage.setItem("favoritter", JSON.stringify(favoritter));

    event.currentTarget.textContent =
        favoritter.includes(game.titel) ? "♥" : "♡";
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


filterToggle.addEventListener("click", () => {
    window.location.href = "filter.html";
});
