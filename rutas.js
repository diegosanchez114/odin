 var usuariosController= require('./API/Controladores/usuariosController.js').usuariosController

 var midleware= require("./midleware/midleware.js").midleware
 

//Ruta al controlador para guardar datos
app.post('/usuarios/Registrar', function (request, response) {
    //var nombre= request.body.nombre
    usuariosController.Registrar(request, response)

}) 

app.post('/usuarios/Guardar', function (request, response) {
    //var nombre= request.body.nombre
    usuariosController.Guardar(request, response)

}) 

//Ruta al controlador para actualizar datos
app.put('/usuarios/Actualizar', function (request, response) {
    
    usuariosController.Actualizar(request, response)
})


//Ruta al controlador para Listar datos
app.get('/usuarios/Listar',midleware.Obligalogin ,midleware.SoloAdmin, function (request, response) {
   usuariosController.Listar(request, response)
})

app.post('/usuarios/ListarId', function (request, response) {
    usuariosController.ListarId(request, response)
 })

//Ruta al controlador para eliminar
app.post('/usuarios/Eliminar', function (request, response) {   
    usuariosController.Eliminar(request, response)
})

//Ruta al controlador para Login
app.post('/usuarios/Login', function (request, response) {   
    usuariosController.Login(request, response)
})

//Ruta para activar el estado del usuario
app.post('/usuarios/Activar', function (request, response) {
    usuariosController.Activar(request, response)
 })

 app.post('/usuarios/solicitarCodigo', function (request, response) {   
    usuariosController.solicitarCodigo(request, response)
})

app.post('/usuarios/recuperarPassword', function (request, response) {   
    usuariosController.recuperarPassword(request, response)
})

app.post('/usuarios/estado', function (request, response) {   
    response.json(request.session)
})

app.post('/usuarios/logout', function (request, response) {   
    request.session.destroy()
    response.json({state: true})
})


//Productos

var productosController= require('./API/Controladores/productosController.js').productosController

app.post('/productos/Guardar', function (request, response) {
    //var nombre= request.body.nombre
    productosController.Guardar(request, response)

}) 

//Ruta al controlador para actualizar datos
app.put('/productos/Actualizar', function (request, response) {
    
    productosController.Actualizar(request, response)
})


//Ruta al controlador para Listar datos
app.get('/productos/Listar', function (request, response) {
   productosController.Listar(request, response)
})

app.post('/productos/ListarId', function (request, response) {
    productosController.ListarId(request, response)
 })

//Ruta al controlador para eliminar
app.post('/productos/Eliminar', function (request, response) {   
    productosController.Eliminar(request, response)
})



//Servicios

var serviciosController= require('./API/Controladores/serviciosController.js').serviciosController

app.post('/servicios/Guardar', function (request, response) {
    //var nombre= request.body.nombre
    serviciosController.Guardar(request, response)

}) 

//Ruta al controlador para actualizar datos
app.put('/servicios/Actualizar', function (request, response) {
    
    serviciosController.Actualizar(request, response)
})


//Ruta al controlador para Listar datos
app.get('/servicios/Listar', function (request, response) {
   serviciosController.Listar(request, response)
})

app.post('/servicios/ListarId', function (request, response) {
    serviciosController.ListarId(request, response)
 })

//Ruta al controlador para eliminar
app.post('/servicios/Eliminar', function (request, response) {   
    serviciosController.Eliminar(request, response)
})







