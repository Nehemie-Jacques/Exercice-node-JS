
import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json()); 

// Récupération de la liste des utilisateurs
app.get('/users', (req, res) => {
    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' }); 
        }
        const users = JSON.parse(data || '[]'); 
        res.status(200).json({ message: 'Données récupérées avec succès', users})
    })
})

app.post('/users', (req, res) => {
    const { name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Données invalides'});
    }

    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Erreur interne' });
        let users = JSON.parse(data || '[]');
        users.push({ name, email, password});

        fs.writeFile('./database.json', JSON.stringify(users, null, 2), 'utf-8', (err) => {
            if (err) return res.status(500).json({ message: 'Erreur d\'écriture'});
        
            res.status(201).json({ message: 'Utilisateur ajouté avec succès'})
        });
    }); 
});

app.listen(3000, () => {
    console.log('Serveur lancé sur le port 3000');
})
