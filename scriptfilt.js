"use strict";

function filtrerSpil() {

    // Hent valgene fra filter.html
    const params = new URLSearchParams(window.location.search);

    const spillere = params.getAll("spillere").map(Number);
    const vibes = params.getAll("vibe");
    const tider = params.getAll("tid");
    const sprog = params.getAll("sprog");

    // Start med alle spil
    let filteredSpil = [...spil];

    // FILTRER EFTER ANTAL SPILLERE
    if (spillere.length > 0) {
        filteredSpil = filteredSpil.filter(game =>
            spillere.some(antal =>
                game.antalSpillere.includes(antal)
            )
        );
    }

    // FILTRER EFTER VIBE
    if (vibes.length > 0) {
        filteredSpil = filteredSpil.filter(game => {

            const kategorier = [
                game.type,
                game.genre,
                game.vibe
            ].flat().filter(Boolean).join(" ").toLowerCase();

            return vibes.some(vibe =>
                kategorier.includes(vibe.toLowerCase())
            );
        });
    }

    // FILTRER EFTER SPILLETID
    if (tider.length > 0) {
        filteredSpil = filteredSpil.filter(game => {

            const tal = String(game.spilletid)
                .match(/\d+/g)?.map(Number) || [];

            if (tal.length === 0) return false;

            const start = tal[0];
            const slut = tal[1] ?? start;

            return tider.some(tid => {
                if (tid === "60+") {
                    return slut >= 60;
                }

                const [fra, til] = tid.split("-").map(Number);

                return start <= til && slut >= fra;
            });
        });
    }

    // FILTRER EFTER SPROG
    if (sprog.length > 0) {
        filteredSpil = filteredSpil.filter(game =>
            sprog.some(valgt =>
                game.sprog.includes(valgt)
            )
        );
    }

    // SØGEFELT
    const søgefelt = document.getElementById("search-input");

    if (søgefelt && søgefelt.value.trim()) {
        const søgning = søgefelt.value.toLowerCase().trim();

        filteredSpil = filteredSpil.filter(game =>
            game.titel.toLowerCase().includes(søgning) ||
            game.type.toLowerCase().includes(søgning) ||
            String(game.genre).toLowerCase().includes(søgning)
        );
    }

    // SORTERING
    const sortering =
        document.getElementById("predefined-search")?.value;

    if (sortering === "titel-az") {
        filteredSpil.sort((a, b) =>
            a.titel.localeCompare(b.titel, "da")
        );
    }

    if (sortering === "titel-za") {
        filteredSpil.sort((a, b) =>
            b.titel.localeCompare(a.titel, "da")
        );
    }

    const startTid = game =>
        parseInt(String(game.spilletid), 10);

    if (sortering === "tid-stigende") {
        filteredSpil.sort((a, b) =>
            startTid(a) - startTid(b)
        );
    }

    if (sortering === "tid-faldende") {
        filteredSpil.sort((a, b) =>
            startTid(b) - startTid(a)
        );
    }

    // VIS KUN DE SPIL, DER PASSER
    displaySpil(filteredSpil);
}

// Start filtreringen automatisk
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("search-input")
        ?.addEventListener("input", filtrerSpil);

    document.getElementById("predefined-search")
        ?.addEventListener("change", filtrerSpil);

    filtrerSpil();
});