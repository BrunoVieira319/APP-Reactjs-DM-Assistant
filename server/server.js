var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var PouchDB = require('pouchdb');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(3009, () => console.log("Server iniciado na porta 3009"));

var db = new PouchDB('my_database');

app.post('/personagem', (req, res) => {
    let personagem = req.body;

    //Esse método atualiza também
    db.post(personagem, (err, result) => {
        if (err) { return console.log(err) }
        res.status(200).end();
    })
})

app.get('/personagem', (req, res) => {
    db.allDocs({
        include_docs: true,
        attachments: true
    }, (err, doc) => {
        if (err) { return console.log(err) }

        let personagens = doc.rows.map(obj => obj.doc);
        res.send(personagens);
    })
})

app.delete('/personagem', (req, res) => {
    db.remove(req.body, (err, response) => {
        if (err) { return console.log(err) }
        res.status(200).end();
    })
})

app.put('/personagem', (req, res) => {
    let personagem = req.body;

    db.post(personagem, (err, result) => {
        if (err) { return console.log(err) }
        res.status(200).end();
    })
})