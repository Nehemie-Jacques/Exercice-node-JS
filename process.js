// Exercice 6
const args = process.argv.slice(2);
console.log("Les différents arguments sont : ")
args.forEach((arg, index) => {
    console.log(`Argument ${index} : ${arg}`)
})
console.log("Les informations sur le processeur sont :")
console.log(`Process ID : ${process.pid}`)
console.log(`La version de Node.js est : ${process.version}`)