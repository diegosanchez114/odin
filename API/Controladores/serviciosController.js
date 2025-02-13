var serviciosModel = require('../Modelos/serviciosModel.js').serviciosModel
var serviciosController = {}
const config = require('../.././config.js').config

serviciosController.Guardar = function (request, response) {

    var post = {
        nombre: request.body.nombre,
        codigo: request.body.codigo,
    }   


    if (post.nombre == undefined || post.nombre == null || post.nombre == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (post.codigo == undefined || post.codigo == null || post.codigo == '') {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    serviciosModel.ValidarCodigo(post, function (respuesta) {
        if (respuesta.existe == 'Si') {
            response.json({ state: false, mensaje: "Ese codigo ya existe intente con otro" })
        }

        else {
           
            serviciosModel.Guardar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Producto guardado correctamente" })
                    //Enviar Correo                 

                }
                else {
                    response.json({ state: false, mensaje: "Se presento un error al almacenar" })
                }
            })

        }
    })





    /*  datos.push(post)
     response.json({state:true, mensaje: "Usuario guardado correctamente"}) */
}

//API para guardar informacion con POST y quitando el parametro de la URL y con requet.body
serviciosController.Actualizar = function (request, response) {

    //API para actualizar informacion con PUT y quitando el parametro de la URL y con requet.body

    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
    }


    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorioo" })
        return false
    }

   
    serviciosModel.Actualizar(post, function (respuesta) {
        response.json({ state: true, mensaje: "Producto actualizado correctamente" })
        return false
    })



}


//API para ver servicios
serviciosController.Listar = function (request, response) {
    serviciosModel.Listar(null, function (respuesta) {
        response.json({ state: true, datos: respuesta.datos })
    })

}

//API para ver servicios por ID
serviciosController.ListarId = function (request, response) {
    var post = {
        _id: request.body._id,
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    serviciosModel.ListarId(post, function (respuesta) {
        response.json({ state: true, datos: respuesta.datos })
    })

}

//API para eliminar informacion con DELETE y quitando el parametro de la URL y con requet.body
serviciosController.Eliminar = function (request, response) {
    var post = {
        _id: request.body._id,

    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    serviciosModel.Eliminar(post, function (respuesta) {
        response.json({ state: true, mensaje: "Producto eliminado correctamente" })
        return false
    })
}

module.exports.serviciosController = serviciosController