'use strict'

//importamos express
var express = require('express');
var bodyParser = require('body-parser');

//accedemos al modulo de express
var app = express();

//cargamos archivos de rutas
var project_routes = require('./routes/project');

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
//devuelve en un json las peticiones
app.use(bodyParser.json()); 


// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//creacion de rutas por get
/*
app.get('/', (req, res) => {
    res.status(200).send("<h1>Pagina de Inicio</h1>");
});

app.get('/test', (req, res) => {
    res.status(200).send({
        mensaje: 'hola mundo desde el api de nodejs'
    });
});
*/

//rutas
app.use('/api', project_routes);

//exportar
module.exports = app;