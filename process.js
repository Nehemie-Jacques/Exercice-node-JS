// Exercice 6
const args = process.argv.slice(2);
console.log("Les différents arguments sont : ")
args.forEach((arg, index) => {
    console.log(`Argument ${index} : ${arg}`)
})
console.log("Les informations sur le processeur sont :")
console.log(`Process ID : ${process.pid}`)
console.log(`La version de Node.js est : ${process.version}`)

// Exercice 7
const crypto = require("crypto")
const readline = require("readline")
const rl = readline.createInterface({ // Crée une interface readline
    input : process.stdin, // pour lire l'entrée standard
    output : process.stdout // pour écrire sur la sortie standard
})
rl.question("Entrer une chaine de caractères : ", (input) => { // Demande à l'utilisateur d'entrer une chaine de caractères
    const hash = crypto.createHash('sha256') // Crée un hash SHA-256
                       .update(input) // Met à jour le hash avec la chaine de caractères
                       .digest('hex') // Calcule le hash et le convertit en hexadécimal
    console.log(`Le hash SHA-256 de cette chaine est : ${hash}`) // Affiche le hash
    rl.close() // Ferme l'interface readline
})

// Exercice 8
const { exec} = require("child_process"); 
const { error } = require("console");
const { stdout, stderr } = require("process");
const command = 'ls' // Commande à exécuter
exec(command, (error, stdout, stderr) => {
    if (error) { // 
        console.error(`Erreur d'exécution de la commande : ${error.message}`)
        return
    }
    if (stderr) {
        console.error(`Erreur dans la sortie standard : ${stderr}`);  
        return          
    }
    console.log(`Réultat de "${command}" : \n${stdout}`) // 
})
