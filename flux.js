/* import fs from'fs';
import { Transform } from 'stream';
const transformation = new Transform ({
    transform (chunk, encoding, callback) {
        const data = EncodedAudioChunk.toString().toUpperCase();
        callback(null, data);
    }
})
const readflux = fs.createReadStream('input.txt')
const writeflux = fs.createWriteStream('output.txt')

readflux.pipe(writeflux) */ 


import express from "express";
const app = express();
const port = 3000;

app.get("/home", (req, res) => {
    res.status(200).send("Hello world from home")
})
app.get("/about", (req, res) => {
    res.status(200).send("Hello world from about")
})
app.get("/contact", (req, res) => {
    res.status(200).send("Hello world from contact")
})
app.get("/error", (req, res) => {
    res.status(404).send("Sorry, this page isn't found")
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})