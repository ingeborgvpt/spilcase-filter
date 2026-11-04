"use strict";

function filtrerSpil() {

    // Hent valgene fra filter.html
    const params = new URLSearchParams(window.location.search);

    const spillere = params.getAll("spillere");
    const vibes = params.getAll("vibe");
    const tider = params.getAll("tid");
    const sprog = params.getAll("sprog");

    // Start med alle spil
    let filteredSpil = [...spil];

    // FILTRER EFTER ANTAL SPILLERE
    if (spillere.length > 0) {
        filteredSpil = filteredSpil.filter(game =>
            spillere.some(valgt => {
                const antal = game.antalSpillere || [];

                if (valgt === "8+") {
                    return antal.some(n => n >= 8);
                }

                return antal.includes(Number(valgt));
            })
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
               if (tid === "45+") {
            return slut >= 45;
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

  const søgefelt = document.getElementById("search-input");

if (søgefelt && søgefelt.value.trim()) {
    const søgning = søgefelt.value.toLowerCase().trim();

    filteredSpil = filteredSpil.filter(game => {

        const spillere = Array.isArray(game.antalSpillere)
            ? game.antalSpillere.map(antal => `${antal} spillere`).join(" ")
            : "";

        const søgetekst = [
            game.titel,
            game.type,
            game.genre,
            game.vibe,
            game.sprog,
            game.sværhedsgrad,
            game.producent,
            game.udvikler,
            game.spilletid,
            game.spilletid !== undefined ? `${game.spilletid} min` : "",
            spillere
        ]
        .flat()
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

        return søgetekst.includes(søgning);
    });
}
    
    // VIS KUN DE SPIL, DER PASSER
    displaySpil(filteredSpil);
}

// Start filtreringen automatisk
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("search-input")
        ?.addEventListener("input", filtrerSpil);


    filtrerSpil();
});