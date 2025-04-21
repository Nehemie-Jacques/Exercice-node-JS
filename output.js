// Exercice 1
const fs = require("fs");
try {
  const fileInput = fs.readFileSync(`input.txt`, "utf8");
  const message = fileInput.toUpperCase();
  fs.writeFileSync(`output.txt`, message);
  console.log(message);
} catch (error) {
  console.log("Erreur lors de la lecture");
}

// Exercice 2
const path = require("path")
let trame = path.join('users', 'categories', 'people', '...', 'hobbies')
console.log(trame)
let frame = path.normalize('users/categories//people/../hobbies')
console.log(frame)
let chrome = path.dirname('users/categories/people/hobbies')
console.log(chrome)

// Exercice 3
const os = require("os")
console.log("Type: " + os.type())
console.log("Architecture: " + os.arch())
console.log("Totalment: " + os.totalmem())
console.log("Freemem: " + os.freemem())
console.log("Processeur: " + os.cpus())

// Exercice 4
const http = require('http')
const port = 3000
const server = http.createServer((req, res) => {
    if (req.url === '/' ) {
        res.statusCode = 200
        res.end('Bienvenu sur ce nouveau serveur')
    } else {
        res.statusCode = 404
        res.end('Error 404 : Page non truvée')
    }
})
server.listen(port, () => {
    console.log('Le serveur est en cours dexécution')
})

// Exercice 5
const EventEmitter  = require('node:events');
const eventEmitter = new EventEmitter();
eventEmitter.on('greeting', (name) => {
  console.log(`Bonjour, ${name}`)
})
eventEmitter.emit('greeting', 'Nehemie')