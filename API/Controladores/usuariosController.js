var usuariosModel = require('../Modelos/usuariosModel.js').usuariosModel
var usuariosController = {}
const config = require('../.././config.js').config
const nodemailer = require("nodemailer")



function tiempoTranscurrido(fechaISO) {
        const fechaInicio = new Date(fechaISO);
        const fechaActual = new Date();
    
        const milisegundosTranscurridos = fechaActual - fechaInicio;
    
        const segundos = Math.floor(milisegundosTranscurridos / 1000) / 60;
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
    
        return Math.ceil(milisegundosTranscurridos / 1000 / 60)
            
        
    
}





usuariosController.Login = function (request, response) {
    var post = {
        email: request.body.email,
        password: request.body.password
    }

    if (post.email == undefined || post.email == null || post.email == '') {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (post.password == undefined || post.password == null || post.password == '') {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    post.password = SHA256(post.password + config.secret)

    usuariosModel.ValidarActivo(post, function (respuesta) {
        if (respuesta.state == false) {
            response.json(respuesta)
        }
        else {
            if (respuesta.estado == 0) {
                response.json({ state: true, mensaje: "Por favor active la cuenta" })
            }

            else {
                usuariosModel.Login(post, function (respuesta) {
                    request.session._id= respuesta._id
                    request.session.nombre= respuesta.nombre
                    request.session.rol= respuesta.rol
                    response.json(respuesta)
                })
            }
        }
    })

}

//API para guardar informacion con POST y quitando el parametro de la URL y con requet.body

usuariosController.Registrar = function (request, response) {

    var post = {
        nombre: request.body.nombre,
        email: request.body.email,
        telefono: request.body.telefono,
        password: request.body.password

    }

    function esSoloNumero(dato) {
        const regex = /^[0-9]+$/;
        return regex.test(dato);
    }


    if (post.nombre == undefined || post.nombre == null || post.nombre == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (post.email == undefined || post.email == null || post.email == '') {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (post.telefono == undefined || post.telefono == null || post.telefono == '') {
        response.json({ state: false, mensaje: "El campo telefono es obligatorio" })
        return false
    }

    if (post.password == undefined || post.password == null || post.password == '') {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    post.password = SHA256(post.password + config.secret)



    usuariosModel.ValidarEmail(post, function (respuesta) {
        if (respuesta.existe == 'Si') {
            response.json({ state: false, mensaje: "Ese email ya existe intente con otro" })
        }

        else {
            var azar = "B-" + Math.ceil(Math.random() * (9999 - 1000) + 1000)
            post.codigo = azar

            usuariosModel.Registrar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Usuario guardado correctamente, verifique su bandeja de entrada" })
                    //Enviar Correo


                    const transporter = nodemailer.createTransport({
                        host: config.email.host,
                        port: config.email.port,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: config.email.user,
                            pass: config.email.pass
                        }
                    })

                    var mailOptions = {
                        from: config.email.user,
                        to: post.email,
                        subject: "Verifica tu cuenta con el codigo: " + azar,
                        html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0;">

                                    <div style="max-width: 600px; margin: 50px auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                                    <div style="text-align: center; margin-bottom: 30px;">
                                        <h1 style="color: #333;">¡Bienvenido a Tu Cuenta!</h1>
                                    </div>
  
                                    <div style="font-size: 18px; color: #555; margin-bottom: 20px;">
                                        <p>Gracias por registrarte. Para activar tu cuenta, ingresa el siguiente código en la página de activación:</p>
                                        <p style="font-size: 20px; font-weight: bold; color: #2a9d8f; padding: 10px; background-color: #e9f5f3; border: 1px solid #2a9d8f; border-radius: 4px; display: inline-block;">
                                        ${azar}
                                        </p>
                                    </div>
                                
                                    <div style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">
                                        <p>Si no solicitaste este registro, por favor ignora este mensaje.</p>
                                        <p><a href="${config.urlReal}/Activar/${post.email}/${azar}">Activar Cuenta</a></p>
                                    </div>
                                    
                                    </div>
                                
                                </div>`
                    }

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error)
                        }
                        else {
                            console.log(info)
                        }
                    })

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

usuariosController.Guardar = function (request, response) {

    var post = {
        nombre: request.body.nombre,
        email: request.body.email,
        telefono: request.body.telefono,
        password: request.body.password

    }

    function esSoloNumero(dato) {
        const regex = /^[0-9]+$/;
        return regex.test(dato);
    }


    if (post.nombre == undefined || post.nombre == null || post.nombre == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (post.email == undefined || post.email == null || post.email == '') {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (post.telefono == undefined || post.telefono == null || post.telefono == '') {
        response.json({ state: false, mensaje: "El campo telefono es obligatorio" })
        return false
    }

    if (post.password == undefined || post.password == null || post.password == '') {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    post.password = SHA256(post.password + config.secret)



    usuariosModel.ValidarEmail(post, function (respuesta) {
        if (respuesta.existe == 'Si') {
            response.json({ state: false, mensaje: "Ese email ya existe intente con otro" })
        }

        else {
            var azar = "B-" + Math.ceil(Math.random() * (9999 - 1000) + 1000)
            post.codigo = azar

            usuariosModel.Guardar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Usuario guardado correctamente" })
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
usuariosController.Actualizar = function (request, response) {

    //API para actualizar informacion con PUT y quitando el parametro de la URL y con requet.body

    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        telefono: request.body.telefono,
        rol: request.body.rol,
        estado: request.body.estado
    }


    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorioo" })
        return false
    }

    if (post.telefono == undefined || post.telefono == null || post.telefono == '') {
        response.json({ state: false, mensaje: "El campo telefono es obligatorio" })
        return false
    }

    if (post.rol == undefined || post.rol == null || post.rol == '') {
        response.json({ state: false, mensaje: "El campo rol es obligatorio" })
        return false
    }

    if (post.estado == undefined || post.estado == null || post.estado == '') {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }

    usuariosModel.Actualizar(post, function (respuesta) {
        response.json({ state: true, mensaje: "Usuario actualizado correctamente" })
        return false
    })



}


//API para ver usuarios
usuariosController.Listar = function (request, response) {
    usuariosModel.Listar(null, function (respuesta) {
        response.json({ state: true, datos: respuesta.datos })
    })

}

//API para ver usuarios por ID
usuariosController.ListarId = function (request, response) {
    var post = {
        _id: request.body._id,
    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }

    usuariosModel.ListarId(post, function (respuesta) {
        response.json({ state: true, datos: respuesta.datos })
    })

}

//API para eliminar informacion con DELETE y quitando el parametro de la URL y con requet.body
usuariosController.Eliminar = function (request, response) {
    var post = {
        _id: request.body._id,

    }

    if (post._id == undefined || post._id == null || post._id == '') {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" })
        return false
    }




    usuariosModel.Eliminar(post, function (respuesta) {
        response.json({ state: true, mensaje: "Usuario eliminado correctamente" })
        return false
    })
}

usuariosController.Activar = function (request, response) {
    var post = {
        email: request.body.email,
        codigo: request.body.codigo
    }

    if (post.email == undefined || post.email == null || post.email == '') {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (post.codigo == undefined || post.codigo == null || post.codigo == '') {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    usuariosModel.Activar(post, function (respuesta) {
        response.json(respuesta)

    })
}

usuariosController.solicitarCodigo = function (request, response) {
    var post = {
        email: request.body.email,
    }

    if (post.email == undefined || post.email == null || post.email == '') {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    post.codrec = "R-" + Math.ceil(Math.random() * (9999 - 1000) + 1000)

    usuariosModel.crearCodigo(post, function (respuesta) {

        if (respuesta.state == false) {
            response.json(respuesta)
        }

        else {
            response.json({ state: true, mensaje: "Hemos enviado un mensaje de recuperacion a tu correo electronico" })

            const transporter = nodemailer.createTransport({
                host: config.email.host,
                port: config.email.port,
                secure: false,
                requireTLS: true,
                auth: {
                    user: config.email.user,
                    pass: config.email.pass
                }
            })

            var mailOptions = {
                from: config.email.user,
                to: post.email,
                subject: "Recuperar Password: " + post.codrec,
                html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0;">
    
                        <div style="max-width: 600px; margin: 50px auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #333;">Recuperación de Cuenta</h1>
                            </div>
    
                            <div style="font-size: 18px; color: #555; margin-bottom: 20px;">
                            <p>Hola, hemos recibido una solicitud para recuperar tu cuenta. Para completar este proceso, por favor utiliza el siguiente código:</p>
                            <p style="font-size: 20px; font-weight: bold; color: #2a9d8f; padding: 10px; background-color: #e9f5f3; border: 1px solid #2a9d8f; border-radius: 4px; display: inline-block;">
                                ${post.codrec}
                            </p>
                            </div>
    
                            <div style="font-size: 16px; color: #555; margin-top: 20px;">
                            <p>Este código será válido solo por 30 minutos. Si no solicitaste este código, por favor ignora este mensaje.</p>
                            </div>
    
                            <div style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">
                            <p></p>
                            </div>
                        </div>
    
                    </div>`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(info)
                }
            })
        }

    })
}

usuariosController.recuperarPassword = function (request, response) {
    var post = {
        email: request.body.email,
        password: request.body.password,
        codrec: request.body.codrec,
        confirmacion: request.body.confirmacion
    }



    if (post.email == undefined || post.email == null || post.email == '') {
        response.json({ state: false, mensaje: "El campo email es obligatorio" })
        return false
    }

    if (post.password == undefined || post.password == null || post.password == '') {
        response.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false
    }

    if (post.codrec == undefined || post.codrec == null || post.codrec == '') {
        response.json({ state: false, mensaje: "El campo codrec es obligatorio" })
        return false
    }

    if (post.confirmacion == undefined || post.confirmacion == null || post.confirmacion == '') {
        response.json({ state: false, mensaje: "El campo confirmacion es obligatorio" })
        return false
    }

    if (post.confirmacion != post.password) {
        response.json({ state: false, mensaje: "La confirmacion y el password no coinciden" })
        return false
    }

    post.password = SHA256(post.password + config.secret)

    usuariosModel.expiracion(post, function (exp) {
        var minutos = tiempoTranscurrido(exp.datos.fecharec)
        if(minutos > 1){
            
            response.json({state: false, mensaje:"Codigo a caducado", tiempo:minutos})
        }

        else{
            usuariosModel.recuperarPassword(post, function(respuesta){
            response.json({tiempo: minutos, respuesta})            
        })
        }
        
    })     
    
}



module.exports.usuariosController = usuariosController