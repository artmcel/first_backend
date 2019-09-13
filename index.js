var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio', {useNewUrlParser: true})
.then( () => {
    console.log("Conexion exitosa");

    //creacion del servidor
    app.listen(port, () => {
        console.log("Servidor corriendo bien en la url");
    }); 

})
.catch(err => console.log(err));