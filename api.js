
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser'; // body-parser permet à notre serveur de comprendre les données JSON envoyées dans le corps de la requête  

const app = express();
app.use(bodyParser.json()); // on dit à Expressd'utiliser body-parser pour les corps de requête HTTP en JSON 

// Récupération de la liste des utilisateurs
app.get('/users', (req, res) => { // On définit une route HTTP GET appelée /users qui sert à récupérer tous les utilisateurs
    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) { // Si une erreur se produit lors de la lecture du fichier (pa exemple si le fichier n'existe pas), on renvoie une réponse avec le code d'erreur 500
            return res.status(500).json({ message: 'Erreur de lecture du fichier' }); // '500' signifie une erreur interne du serveur
        }
        const users = JSON.parse(data || '[]');  // On essaie de parser le contenu du fichier JSON. Si le fichier est vide, on initialise users à un tableau vide
        res.status(200).json({ message: 'Données récupérées avec succès', users})
    })
})

// Ajout d'un nouvel utilisateur
app.post('/users', (req, res) => {
    const { name, email, password} = req.body; // On extrait les données du corps de la requête

    if (!name || !email || !password) { // On vérifie si toutes les données nécessaires sont présentes
        return res.status(400).json({ message: 'Données invalides'});
    }

    // On lit le fichier database.json pour récupérer les utilisateurs existants
    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Erreur interne' });
        let users = JSON.parse(data || '[]'); 
        users.push({ name, email, password}); // On ajoute le nouvel utilisateur au tableau

        fs.writeFile('./database.json', JSON.stringify(users, null, 2), 'utf-8', (err) => { // On écrit le tableau mis à jour dans le fichier database.json
            // JSON.stringify(users, null, 2) convertit le tableau d'utilisateurs en chaîne JSON formatée
            // 'utf-8' spécifie l'encodage du fichier
            // 'err' est une erreur qui peut se produire lors de l'écriture du fichier
            // 'users' est le tableau d'utilisateurs mis à jour
            // 'null' et '2' sont utilisés pour formater le JSON de manière lisible
            if (err) return res.status(500).json({ message: 'Erreur d\'écriture'});
        
            res.status(201).json({ message: 'Utilisateur ajouté avec succès'})
        });
    }); 
});

// Suppression d'un utilisateur
app.delete('/users/:email', (req, res) => { // On définit une route HTTP DELETE qui prend un paramètre d'URL :email
    // Le paramètre :email représente l'email de l'utilisateur à supprimer
    // On utilise req.params pour accéder aux paramètres de l'URL
    const email = req.params.email; // On récupère l'email de l'utilisateur à supprimer depuis les paramètres de la requête
    
    // On lit le fichier database.json pour récupérer les utilisateurs existants
    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) throw err; 
        let database = JSON.parse(data); // On parse le contenu du fichier JSON pour obtenir un tableau d'utilisateurs
        const newdatabase = database.filter(user => user.email !== email); // On filtre le tableau pour exclure l'utilisateur à supprimer

        if (newdatabase.length === database.length) { // Si la longueur du tableau filtré est égale à celle du tableau d'origine, cela signifie que l'utilisateur n'a pas été trouvé
            return res.status(404).json({ message: 'Utilisateur non trouvé'});
        }

        fs.writeFile('./database.json', JSON.stringify(newdatabase), 'utf-8', (err) => {
            if (err) throw err; 
            res.status(200).json({ message: 'l\'utilisateur a été supprimé avec succès'});
        });
    });
});

app.listen(3000, () => {
    console.log('Serveur lancé sur le port 3000');
})
