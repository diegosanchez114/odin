/* global.datos= [] */
var productosModel= {}
const mongoose= require('mongoose')

var Schema= mongoose.Schema

var productoschema= new Schema({
        nombre: String,       
        codigo: String,
        descripcion: String,
        cantidad: Number,
        estado: String,
        precio: Number,
        imagen: String  

})

const myModel= mongoose.model("productos", productoschema)


productosModel.ValidarCodigo= function(post, callback){
    //var validacion = datos.findIndex((item) => item.cedula == post.cedula)

    myModel.findOne({codigo: post.codigo}).then((respuesta) => {
        
        if (respuesta == null){
            return callback({existe: 'No'})
        }
        else {
            return callback({existe: 'Si'})
        }
    })
  
}


productosModel.Guardar= function(post, callback){
    const instancia= new myModel
    instancia.nombre= post.nombre
    instancia.codigo= post.codigo 
    instancia.descripcion= post.descripcion
    instancia.cantidad= post.cantidad
    instancia.estado= post.estado
    instancia.precio= post.precio 
    instancia.imagen= post.imagen  
  

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

productosModel.Listar= function(post, callback){
    /* return callback({datos: datos}) */
    myModel.find({},{}).then((respuesta) => {
        return callback({datos:respuesta})
    })
}


productosModel.ListarId= function(post, callback){
    /* return callback({datos: datos}) */
    myModel.find({_id: post._id},{}).then((respuesta) => {
        return callback({datos:respuesta})
    })
}

productosModel.Actualizar= function(post, callback){
   myModel.findOneAndUpdate({_id: post._id}, 
    {
        nombre: post.nombre,
        descripcion: post.descripcion,
        cantidad: post.cantidad,
        estado: post.estado,
        precio: post.precio,
        imagen: post.imagen
        
    }
    ).then((respuesta) => {
    return callback({datos:respuesta})
   }).catch((error) => {
        console.log(error)
   })
   
    

}

productosModel.Eliminar= function (post, callback){
    myModel.deleteOne({_id: post._id}).then ((respuesta) => {
       return callback({datos:respuesta}) 
    })
   
}


module.exports.productosModel= productosModel