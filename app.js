//creamos el servidor
var express = require('express')
global.app = express()
global.SHA256= require('sha256')
const cors= require('cors')

//Metodos
//CREAR POST
//ACTUALIZAR PUT
//LISTAR GET
//BORRAR DELETE

//Implementamos body parser para el manejo del post
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Variable para conectar Mongo
const mongoose= require('mongoose')
const config= require('./config.js').config

//Variable para express-session sesiones de la app
const session= require("express-session")

//Antes de que empiezen las rutas copiamos la llave de CORS para permitir origen
app.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");

    next();

});

app.use(session({
    secret:config.secret,
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge:config.expiracion, httpOnly: true
    },
    name: "Cookieapp",
    rolling:true
}))

//llamamos rutas
require('./rutas.js')

//Conexion a mongo
mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta) => {
    console.log("conexion a mongo correcta")
    //console.log(respuesta)
}).catch((error) => {
    console.log(error)
}) 

//Conexion a mongo
/* mongoose.connect("mongodb://" + config.bdUser + ":" + config.bdPass + '@' + config.bdIp + ":" + config.bdPort + "/" + config.bd).then((respuesta) => {
    console.log("conexion a mongo correcta")
    //console.log(respuesta)
}).catch((error) => {
    console.log(error)
})
 */

app.use(cors({
    origin: function(origin, callback){
        if(!origin){
            return callback(null, true)
        }
        if(config.blacklist.indexOf(origin)=== -1){
            return callback("error de cors sin permisos", false)
        }
        else {
            return callback(null, true)
        }
    }
}))

//API creamos el otro get para sumar dos numeros
app.get('/sumar/:num1/:num2', function (request, response) {
    var n1 = parseInt(request.params.num1)
    var n2 = parseInt(request.params.num2)
    response.json({ total: n1 + n2 })
})



global.datos = []
//API para guardar informacion con GET funcionando sin embargo se deja apagada para que se use el Metodo POST
/* app.get('/usuarios/Guardar/:nombre', function(request, response){    
    datos.push({nombre: request.params.nombre})
    response.json({state:true, mensaje: "Usuario guardado correctamente"})
}) */

//creamos el servidor con app listen
app.listen(config.puerto, function () {
    console.log("Servidor funcionando por el puerto " + config.puerto)
})


//Exponer en el backend lo que este en esta carpeta Pagina
app.use('/', express.static(__dirname + '/Pagina/browser'))

app.get('/*', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + "/Pagina/browser/index.html"));
});

/* // Manejo de rutas: Redirige todas las rutas al index.html de Angular
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/tu-app/index.html'));
}); */
