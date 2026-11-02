
"use strict";
// Her skal vi skrive vores søge-, sortering- og filtreringskoder

function filtrerSpil() {
    // Lokal variabel som er en kopi af spillisten
    let filteredSpil = [...spil];

//--------------- Håndtering af søgefelt ------------- //

const searchText = document.getElementById("search-input").value.toLowerCase().trim();

if (searchText) {
    filteredSpil = filteredSpil.filter(game =>
        game.titel.toLowerCase().includes(searchText) ||
        game.type.toLowerCase().includes(searchText) ||
        game.genre.join(" ").toLowerCase().includes(searchText)
    );
}

//----- Håndtering af filtreringspanel ----------- //
const types = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);

const genres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(cb => cb.value);

const minTime = parseFloat(document.getElementById('min-time').value);
const maxTime = parseFloat(document.getElementById('max-time').value);

const cooperativeOnly = document.getElementById('cooperative-only').checked;

if (types.length > 0) {
    filteredSpil = filteredSpil.filter(game => types.includes(game.type));
}

if (genres.length > 0) {
    filteredSpil = filteredSpil.filter(game =>
        genres.filter(genre => game.genre.includes(genre)).length > 0
    );
}

if (!isNaN(minTime)) {
    filteredSpil = filteredSpil.filter(game =>
        game.spilletid && game.spilletid >= minTime
    );
}

if (!isNaN(maxTime)) {
    filteredSpil = filteredSpil.filter(game =>
        game.spilletid && game.spilletid <= maxTime
    );
}

if (cooperativeOnly) {
    filteredSpil = filteredSpil.filter(game => game.samarbejdsspil);
}

// ----- Håndtering af predefineret sortering ----- //
const sorterEfter = document.getElementById("predefined-search").value;

if (sorterEfter === "titel-az") {
    filteredSpil.sort((a, b) => a.titel > b.titel ? 1 : -1);
}

if (sorterEfter === "titel-za") {
    filteredSpil.sort((a, b) => a.titel < b.titel ? 1 : -1);
}

if (sorterEfter === "tid-stigende") {
    filteredSpil.sort((a, b) => (a.spilletid || 999999) - (b.spilletid || 999999));
}

if (sorterEfter === "tid-faldende") {
    filteredSpil.sort((a, b) => (b.spilletid || -1) - (a.spilletid || -1));
}

displaySpil(filteredSpil);
};

document.getElementById("search-input").addEventListener("input", filtrerSpil);
document.getElementById("predefined-search").addEventListener("change", filtrerSpil);
document.getElementById("apply-filters").addEventListener("click", function () {
    filtrerSpil();
    closeFilterPanel();
});
