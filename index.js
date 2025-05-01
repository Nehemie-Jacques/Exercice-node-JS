/* const http = require('http');

const PORT = 4000;
const server = http.createServer((req, res) => {
    res.end("hello");
    console.log("hello");
});

server.listen(PORT, (err) => {
    console.log(`server is listening on port ${PORT}`)
    if (err) throw err
}) */

// import fs from "fs"  // deuxième méthode d'importation de 'fs'
/*
try {
    const fs = require("fs");
    const fileInput = fs.readFileSync(`input.txt`, "utf-8");
    const message = fileInput.toLocaleLowerCase();
    console.log(message);
    fs.writeFileSync("output.txt", message);
    console.log(message);
} catch (error) {
    console.log('Il y a une erreur\n ${error}');
} */

const express = require("express")
const morgan = require("morgan")
// const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const { Sequelize } = require("sequelize")
const {success, getUniqueId} = require("./helper.js")
let pokemons = require("./mock-pokemon")

const app = express()
const port = 3000


const sequelize = new Sequelize ( 
  'pokemons', // nom de la base de données
  'root', // nom d'utilisateur
  '', // mot de passe
  {
    host: 'localhost', 
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT+1'
    },
    logging: false
  }
)

sequelize.authenticate()
  .then(_ => console.log('la connexion à la base de données a bin été établie.'))
  .catch(error => console.error('Impossible de se connecter à la base de données ${error}')) // Affiche l'erreur si la connexion échoue

app
  // .use(favicon[__dirname + "/favicon.ico"])  
  .use(bodyParser.json()) // pour parser le corps de la requête
  .use(morgan('dev')) 

/* app.use((req, res , next) => {
    console.log(`URL : ${req.url}`)
    next()
}) */


app.get('/', (req, res) => res.send("Hello word again and welcome !")); // point de terminaison
app.get("/api/pokemons", (req, res) => {
    const message = "Nous avons obtenu la liste des pokemons"
    res.json(success(message, pokemons)) // renvoie la liste des pokemons
})

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id) 
  const message = "Nous avons trouvé bel et bien un pokemon"
  const pokemon = pokemons.find(pokemon => pokemon.id === id); 
  if (pokemon) {
    res.json(success(message, pokemon))
    // res.send(`vous avez demandé le pokemon n°${pokemon.id} : ${pokemon.name}`);
  } else {
    res.status(404).send(`Aucun Pokemon avec l'id ${id}`)
  }
})

app.post("/api/pokemons", (req, res) => { // 
  const id = getUniqueId(pokemons)
  const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
  pokemons.push(pokemonCreated)
  const message = `Le pokemon ${pokemonCreated.name} a bien été crée`
  res.json(success(message, pokemonCreated))
})

app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonUpdated = { ...req.body, id: id}
  pokemons = pokemons.map(pokemon => {
    return pokemon.id === id ? pokemonUpdated : pokemon
  })
  const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié.`
  res.json(success(message, pokemonUpdated))
})  

app.delete('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id);

  if (!pokemonDeleted) {
    const message = `Aucun Pokémon avec l'id ${id} n'a été trouvé.`;
    return res.status(404).json({ success: false, message });
  }

  pokemons = pokemons.filter(pokemon => pokemon.id !== id); // Met à jour le tableau en excluant le Pokémon supprimé
  const message = `Le Pokémon ${pokemonDeleted.name} a bien été supprimé.`;
  res.json(success(message, pokemonDeleted));
});

/* app.delete('api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons.filter(pokemon => pokemon.id !== id)
  const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé`
  res.json(success(message, pokemonDeleted))
}) */ 

/* app.get('/api/pokemons/', (req, res) => {
    res.send(`Il y a ${pokemons.length} pokemon en tout`)
}) */

app.listen(port, () =>
  console.log(
    `Notre application Node est démarée sur : http://localhost:${port}`
  )
);
