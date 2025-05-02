const http = require('http');
const port = 3000;
const url = require('url') // Importation du module URL pour annalyser les URL et lire les paramètres
// Il nous aidera à séparer l'url "/search?q=bonjour" en deux parties : "/search" et "q=bonjour"
const server = http.createServer((req, res) => {
    console.log(`Method : ${req.method}, URL :${req.url}`); // Affiche la méthode et l'URL de la requête
    
    const urlparse = url.parse(req.url, true); // Analyse de l'URL et on récupère les paramètres avec 'true
    const pathname = urlparse.pathname; // Récupération du chemin de l'URL (la premiere partie "/search")
    const query = urlparse.query; // Récupération des paramètres de l'URL (la deuxieme partie "q=bonjour")
    
    if (pathname === '/') { // On vérifie si le chemin est "/"
        // res.statusCode = 200;
        res.writeHead(200, { 'content-type': 'text/plain'}); // Le texte est en texte brut
        res.end('Bienvenue sur la notre page dacceuil');
    } else if (pathname === '/about') {
        // res.statusCode = 200;
        res.writeHead(200, { 'content-type': 'text/plain'}); // Le texte est en texte brut
        res.end('À propos de moi');
    } else if (pathname ==='/search') { // On vérifie si le chemin est "/search"
        if (query.q) { // On vérifie si le paramètre "q" existe
            res.writeHead(200, { 'content-type': 'application/json'}); // Le texte renvoie du JSON
            res.end(JSON.stringify({query: query.q})); // On renvoie le paramètre "q" au format JSON
        } else {
            res.writeHead(404, { 'content-type': 'text/plain'}); 
            res.end('Le paramètre "q" est manquant'); // Si le paramètre "q" n'existe pas, on renvoie une erreur 404
        }
    } else {
        // res.statusCode = 404; 
        res.writeHead(404, { 'content-type': 'text/plain'});
        res.end('Page non trouvée');
    }
});

server.listen(port, () => {
    console.log(`Le serveur est démarré sur : http://localhost:${port}`)
})