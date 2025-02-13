var midleware= {}

midleware.SoloAdmin= function(request, response, next){
    console.log(request.session.rol)
    if(request.session.rol != "Administrador"){
        response.json({state: false, mensaje: "Solo los administradores pueden usar esta API"})
        return false
    }
    next()
}


midleware.Obligalogin= function(request, response, next){
    console.log(request.session.rol)
    if(request.session.rol == undefined){
        response.json({state: false, mensaje: "Debe iniciar sesion"})
        return false
    }
    next()
}
module.exports.midleware= midleware