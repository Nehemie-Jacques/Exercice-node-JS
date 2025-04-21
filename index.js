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
const favicon = require("serve-favicon")
const {success, getUniqueId} = require("./helper.js")
let pokemons = require("./mock-pokemon")

const app = express()
const port = 3000

app
  // .use(favicon[__dirname + "/favicon.ico"])  
  .use(morgan('dev')) 

/* app.use((req, res , next) => {
    console.log(`URL : ${req.url}`)
    next()
}) */


app.get('/', (req, res) => res.send("Hello word again and welcome !")); // point de terminaison

app.get("/api/pokemons", (req, res) => {
    const message = "Nous avons obtenu la liste des pokemons"
    res.json(success(message, pokemons))
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

app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId 
  const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
  pokemons.push(pokemonCreated)
  const message = `Le pokemon ${pokemonCreated.name} a bien été crée`
  res.json(success(message, pokemonCreated))
})

/* app.get('/api/pokemons/', (req, res) => {
    res.send(`Il y a ${pokemons.length} pokemon en tout`)
}) */

app.listen(port, () =>
  console.log(
    `Notre application Node est démarée sur : http://localhost:${port}`
  )
);
