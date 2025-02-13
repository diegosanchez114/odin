/* global.datos= [] */
var usuariosModel= {}
const mongoose= require('mongoose')

var Schema= mongoose.Schema

/*  cedula: request.body.cedula,
        pnombre: request.body.pnombre,
        snombre: request.body.snombre,
        papellido: request.body.papellido,
        sapellido: request.body.sapellido */

var usuarioSchema= new Schema({
        nombre: String,
        email: String,
        telefono: String,
        password: String,
        rol: String,  //1Cliente 2 Admin 3 Vendedor        
        estado: Number, // 1 Activo o  0 Inactivo
        codigo: String,
        codrec: String,
        fecharec: Date

})

const myModel= mongoose.model("usuarios", usuarioSchema)

usuariosModel.expiracion= function(post, callback){
    myModel.findOne({email: post.email},{fecharec: 1}).then((respuesta)=> {
        if (respuesta== null){
            return callback({state: false, mensaje: "el correo no es valido"})
        }
        else{
            return callback({state: true, datos: respuesta})
        }
    })
}

usuariosModel.recuperarPassword= function(post, callback){
    myModel.findOneAndUpdate({email: post.email,codrec: post.codrec},{password: post.password}).then((respuesta) => {
        if(respuesta== null){
            return callback({state: false, mensaje: "El codigo de recuperacion no es valido"})
        }
        else{
            return callback({state:true, mensaje: "Se recupero el password correctamente"})
        }
    })
}

usuariosModel.crearCodigo= function(post, callback){
    myModel.findOneAndUpdate({email: post.email}, {codrec: post.codrec, fecharec: new Date()}).then((respuesta) => {
        if(respuesta== null){
            return callback({state: false, mensaje: "No se pudo crear el codigo de recuperacion"})
        }
        else{
            return callback({state:true})
        }
    })
}

usuariosModel.ValidarEmail= function(post, callback){
    //var validacion = datos.findIndex((item) => item.cedula == post.cedula)

    myModel.findOne({email: post.email}).then((respuesta) => {
        
        if (respuesta == null){
            return callback({existe: 'No'})
        }
        else {
            return callback({existe: 'Si'})
        }
    })
   /*  if(validacion == -1){
        return callback({existe: 'No', validacion:validacion})
    }
    else{
        return callback({existe: 'Si', validacion:validacion})
    } */
}

usuariosModel.ValidarActivo= function(post, callback){
    myModel.findOne({email: post.email},{estado:1}).then((respuesta) => {
        if (respuesta== null){
            return callback({state: false, mensaje: "El correo no es valido"})
        }
        else {
            return callback({state: true, estado:respuesta.estado})
        }
    })
}

usuariosModel.Login= function(post, callback){
    myModel.findOne({email: post.email, password: post.password}, {_id:1, nombre: 1, rol:1}).then((respuesta) => {
        if(respuesta== null){
            return callback({state: false, mensaje: "Credenciales invalidas"})
        }

        else{
            return callback({state: true, mensaje: "Bienvenido " + respuesta.nombre, nombre: respuesta.nombre, rol: respuesta.rol, _id:respuesta._id})
        }
    })
    
}

usuariosModel.Registrar= function(post, callback){
    const instancia= new myModel
    instancia.nombre= post.nombre
    instancia.email= post.email
    instancia.telefono= post.telefono
    instancia.password= post.password  
    instancia.rol= "Cliente"
    instancia.estado= 0
    instancia.codigo= post.codigo

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false})
    })
   /*  datos.push(post)
    return callback({state:true}) */
}

usuariosModel.Guardar= function(post, callback){
    const instancia= new myModel
    instancia.nombre= post.nombre
    instancia.email= post.email
    instancia.telefono= post.telefono
    instancia.password= post.password  
    instancia.rol= "Cliente"
    instancia.estado= 1
  

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false})
    })
   /*  datos.push(post)
    return callback({state:true}) */
}

usuariosModel.Listar= function(post, callback){
    /* return callback({datos: datos}) */
    myModel.find({},{nombre: 1, email: 1, telefono:1, rol:1, estado:1 }).then((respuesta) => {
        return callback({datos:respuesta})
    })
}

usuariosModel.ListarId= function(post, callback){
    /* return callback({datos: datos}) */
    myModel.find({_id:post._id},{nombre: 1, email: 1, telefono:1, rol:1, estado:1 }).then((respuesta) => {
        return callback({datos:respuesta})
    })
}

usuariosModel.Actualizar= function(post, callback){
   myModel.findOneAndUpdate({_id: post._id}, 
    {
        nombre: post.nombre,
        telefono: post.telefono,
        rol: post.rol,
        estado: post.estado
        
    }
    ).then((respuesta) => {
    return callback({datos:respuesta})
   }).catch((error) => {
        console.log(error)
   })
   
    

}

usuariosModel.Eliminar= function (post, callback){
    myModel.deleteOne({_id: post._id}).then ((respuesta) => {
       return callback({datos:respuesta}) 
    })
   
}

usuariosModel.Activar= function (post, callback){
    myModel.findOneAndUpdate({email:post.email, codigo: post.codigo}, {estado:1}).then((respuesta) => {
        if(respuesta== null){
            return callback({state: false, mensaje:"No se pudo activar la cuenta"})
        }

        else{
            return callback({state: true, mensaje:"Cuenta Activada correctamente"})
        }
       
    })
}

usuariosModel.myModel= myModel

module.exports.usuariosModel= usuariosModel