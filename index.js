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

const express = require("express");
let pokemons = require("./mock-pokemon");

const app = express()
const port = 3000

app.get('/', (req, res) => res.send("Hello word again and welcome !")); // point de terminaison

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id);
  if (pokemon) {
    res.json(pokemon)
    // res.send(`vous avez demandé le pokemon n°${pokemon.id} : ${pokemon.name}`);
  } else {
    res.status(404).send(`Aucun Pokemon avec l'id ${id}`)
  }
})

app.get('/api/pokemons/', (req, res) => {
    res.send(`Il y a ${pokemons.length} pokemon en tout`)
})

app.listen(port, () =>
  console.log(
    `Notre application Node est démarée sur : http://localhost:${port}`
  )
);
