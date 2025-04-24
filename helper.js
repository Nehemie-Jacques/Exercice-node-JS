const pokemons = require("./mock-pokemon")

exports.success = (message, data) => { // Fonction pour créer un message de succès
    return {message, data} // Crée un objet avec un message et des données
}

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id) // Transforme le tableau de pokemons en tableau d'ID
    const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b)) // Recherche le plus grand ID
    const uniqueId = maxId + 1 // Crée un nouvel ID unique
    return uniqueId
}