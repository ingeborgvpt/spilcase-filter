"use strict";

/* SPILLEKORT OG FAVORITTER */

const spilContainer = document.getElementById("products-container");

const favoritter = JSON.parse(
    localStorage.getItem("favoritter") || "[]"
);

function displaySpil(spilToDisplay) {

    spilContainer.innerHTML = "";

    if (spilToDisplay.length === 0) {
        spilContainer.innerHTML =
            '<p class="no-products">Ingen spil fundet.</p>';
        return;
    }

    spilToDisplay.forEach(game => {

        /* IKON TIL SVÆRHEDSGRAD */

        const sværhedsgrad = game.sværhedsgrad || "Ikke angivet";

        const niveauIkon = {
            "let": "billeder/let.png",
            "mellem": "billeder/mellem.png",
            "svær": "billeder/svaer.png"
        }[sværhedsgrad.toLowerCase()];

        /* ANTAL SPILLERE */

        const antal = game.antalSpillere || [];

        const spillerTekst = antal.length
            ? `${Math.min(...antal)}-${Math.max(...antal)} personer`
            : "Ikke angivet";

        /* SPILLETID */

        const tid = game.spilletid !== undefined
            ? game.spilletid + " min"
            : "Varierende";

        /* OPRET SPILLEKORT */

        const spilCard = document.createElement("div");
        spilCard.className = "product-card";

        spilCard.innerHTML = `
            <img
                class="product-image"
                src="${game.billede}"
                alt="${game.titel}"
            >

            <div class="product-info">

                <h3 class="product-title">
                    ${game.titel}
                </h3>

                <span class="product-rating">
                    <span class="carbon--star-filled"></span>
                    ${game.rating ?? "Ikke angivet"}
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
                        ${
                            niveauIkon
                                ? `<img class="niveau-ikon" src="${niveauIkon}" alt="">`
                                : ""
                        }
                        ${sværhedsgrad}
                    </p>

                </div>
            </div>

            <button
                type="button"
                class="heart-icon"
                aria-label="Tilføj eller fjern favorit"
                aria-pressed="${favoritter.includes(game.titel)}"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            </button>
        `;

        /* ÅBN INFORMATIONSBOKS VED KLIK PÅ KORT */

        spilCard.addEventListener("click", () => {
            showSpilDialog(game);
        });

        /* GEM ELLER FJERN FAVORIT */

        const hjerte = spilCard.querySelector(".heart-icon");

        hjerte.addEventListener("click", (event) => {

            // Åbn ikke informationsboksen
            event.stopPropagation();

            const index = favoritter.indexOf(game.titel);

            if (index === -1) {
                favoritter.push(game.titel);
            } else {
                favoritter.splice(index, 1);
            }

            // Gem favoritterne i browseren
            localStorage.setItem(
                "favoritter",
                JSON.stringify(favoritter)
            );

            // Fyld eller tøm hjertet
            hjerte.setAttribute(
                "aria-pressed",
                String(favoritter.includes(game.titel))
            );

            // Opdater listen, hvis man kun ser favoritter
            if (
                document.getElementById("sort-spil")?.value === "favoritter"
            ) {
                filtrerSpil();
            }

        });

        /* INDSÆT SPILLEKORTET */

        spilContainer.appendChild(spilCard);

    });
}


/* INFORMATIONSBOKS */

const dialog = document.getElementById("product-dialog");

function showSpilDialog(game) {

    /* BILLEDE */

    const dialogBillede = document.getElementById("dialog-image");

    dialogBillede.src = game.billede;
    dialogBillede.alt = game.titel;

    /* TITEL */

    document.getElementById("dialog-title").textContent =
        game.titel;

    /* RATING */

    document.getElementById("dialog-rating").textContent =
        "★ " + (game.rating ?? "Ikke angivet");

    /* HJÆLPEFUNKTION TIL OPLYSNINGER */

    const vis = værdi => {
        if (Array.isArray(værdi)) {
            return værdi.join(", ");
        }

        return værdi ?? "Ikke angivet";
    };

    /* SPILLETS INFORMATIONER */

    document.getElementById("dialog-info").innerHTML = `
        <p>
            <strong>Type:</strong>
            ${vis(game.type)}
        </p>

        <p>
            <strong>Genre:</strong>
            ${vis(game.genre)}
        </p>

        <p>
            <strong>Vibe:</strong>
            ${vis(game.vibe)}
        </p>

        <p>
            <strong>Antal spillere:</strong>
            ${vis(game.antalSpillere)}
        </p>

        <p>
            <strong>Spilletid:</strong>
            ${vis(game.spilletid)} min
        </p>

        <p>
            <strong>Sværhedsgrad:</strong>
            ${vis(game.sværhedsgrad)}
        </p>

        <p>
            <strong>Sprog:</strong>
            ${vis(game.sprog)}
        </p>

        <p>
            <strong>Samarbejdsspil:</strong>
            ${game.samarbejdsspil ? "Ja" : "Nej"}
        </p>
    `;

    /* ÅBN BOKSEN */

    dialog.showModal();
}


/* LUK INFORMATIONSBOKSEN */

document.getElementById("dialog-close").addEventListener("click", () => {
    dialog.close();
});