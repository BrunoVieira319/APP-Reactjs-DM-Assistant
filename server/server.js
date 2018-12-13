var express = require("express");
var cors = require("cors");
var lokijs = require("lokijs");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
app.use(cors());
app.listen(3009, () => console.log("Server iniciado na porta 3009"));

var db = new lokijs('db.json');
db.addCollection('listaPersonagens');

app.post('/', (req, res) => {
    db.loadDatabase({}, () => {
        let personagem = req.body;

        let list = db.getCollection('listaPersonagens');
        list.insert(personagem);

        db.saveDatabase();
        res.status(200).end();
    })
})

app.get('/personagens', (req, res) => {
    db.loadDatabase({} , () => {
        let list = db.getCollection('listaPersonagens');
        res.json(list.data);
    })
})