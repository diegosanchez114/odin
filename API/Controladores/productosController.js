var productosModel = require('../Modelos/productosModel.js').productosModel
var productosController = {}
const config = require('../.././config.js').config

productosController.Guardar = function (request, response) {

    var post = {
        nombre: request.body.nombre,
        codigo: request.body.codigo,
        descripcion: request.body.descripcion,
        precio: request.body.precio,
        cantidad: request.body.cantidad,
        estado: request.body.estado,
        imagen: request.body.imagen,
    }   


    if (post.nombre == undefined || post.nombre == null || post.nombre == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (post.codigo == undefined || post.codigo == null || post.codigo == '') {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    if (post.descripcion == undefined || post.descripcion == null || post.descripcion == '') {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

    if (post.precio == undefined || post.precio == null || post.precio == '') {
        response.json({ state: false, mensaje: "El campo precio es obligatorio" })
        return false
    }

    if (post.cantidad == undefined || post.cantidad == null || post.cantidad == '') {
        response.json({ state: false, mensaje: "El campo cantidad es obligatorio" })
        return false
    }

    if (post.estado == undefined || post.estado == null || post.estado == '') {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }

    if (post.imagen == undefined || post.imagen == null || post.imagen == '') {
        response.json({ state: false, mensaje: "El campo imagen es obligatorio" })
        return false
    }

    productosModel.ValidarCodigo(post, function (respuesta) {
        if (respuesta.existe == 'Si') {
            response.json({ state: false, mensaje: "Ese codigo ya existe intente con otro" })
        }

        else {
           
            productosModel.Guardar(post, function (respuesta) {
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
productosController.Actualizar = function (request, response) {

    //API para actualizar informacion con PUT y quitando el parametro de la URL y con requet.body

    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        descripcion: request.body.descripcion,
        precio: request.body.precio,
        cantidad: request.body.cantidad,
        estado: request.body.estado,
        imagen: request.body.imagen,
    }


    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorioo" })
        return false
    }

    if (post.descripcion == undefined || post.descripcion == null || post.descripcion == '') {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

    if (post.precio == undefined || post.precio == null || post.precio == '') {
        response.json({ state: false, mensaje: "El campo precio es obligatorio" })
        return false
    }

    if (post.cantidad == undefined || post.cantidad == null || post.cantidad == '') {
        response.json({ state: false, mensaje: "El campo cantidad es obligatorio" })
        return false
    }

    if (post.estado == undefined || post.estado == null || post.estado == '') {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }

    if (post.imagen == undefined || post.imagen == null || post.imagen == '') {
        response.json({ state: false, mensaje: "El campo imagen es obligatorio" })
        return false
    }

   
    productosModel.Actualizar(post, function (respuesta) {
        response.json({ state: true, mensaje: "Producto actualizado correctamente" })
        return false
    })



}




productosController.Listar = function (request, response) {
    productosModel.Listar(null, function (respuesta) {
        response.json({ state: true, datos: respuesta.datos })
    })

}


//API para ver productos por ID
productosController.ListarId = function (request, response) {
    var post = {
        _id: request.body._id,
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    productosModel.ListarId(post, function (respuesta) {
        response.json({ state: true, datos: respuesta.datos })
    })

}

//API para eliminar informacion con DELETE y quitando el parametro de la URL y con requet.body
productosController.Eliminar = function (request, response) {
    var post = {
        _id: request.body._id,

    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    productosModel.Eliminar(post, function (respuesta) {
        response.json({ state: true, mensaje: "Producto eliminado correctamente" })
        return false
    })
}

module.exports.productosController = productosController