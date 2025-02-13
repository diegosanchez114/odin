/* global.datos= [] */
var serviciosModel= {}
const mongoose= require('mongoose')

var Schema= mongoose.Schema

var servicioschema= new Schema({
        nombre: String,       
        codigo: String,     

})

const myModel= mongoose.model("servicios", servicioschema)


serviciosModel.ValidarCodigo= function(post, callback){
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


serviciosModel.Guardar= function(post, callback){
    const instancia= new myModel
    instancia.nombre= post.nombre
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

serviciosModel.Listar= function(post, callback){
    /* return callback({datos: datos}) */
    myModel.find({},{}).then((respuesta) => {
        return callback({datos:respuesta})
    })
}

serviciosModel.ListarId= function(post, callback){
    /* return callback({datos: datos}) */
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({datos:respuesta})
    })
}

serviciosModel.Actualizar= function(post, callback){
   myModel.findOneAndUpdate({_id: post._id}, 
    {
        nombre: post.nombre,
        
    }
    ).then((respuesta) => {
    return callback({datos:respuesta})
   }).catch((error) => {
        console.log(error)
   })
   
    

}

serviciosModel.Eliminar= function (post, callback){
    myModel.deleteOne({_id: post._id}).then ((respuesta) => {
       return callback({datos:respuesta}) 
    })
   
}


module.exports.serviciosModel= serviciosModel