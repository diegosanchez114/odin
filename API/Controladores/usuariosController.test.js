const mongoose = require('mongoose')
var usuariosController = require("./usuariosController.js").usuariosController
global.SHA256 = require("sha256")
const config = require("../../config.js").config
var usuariosModel = require('../Modelos/usuariosModel.js').usuariosModel


describe("POST usuarios/registrar", () => {
    let request;
    let response;

    beforeAll((done) => {
        //Conexion a mongo
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.bdPrueba).then((respuesta) => {
            console.log("conexion a mongo correcta")
            done()
            //console.log(respuesta)
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body: {} }
        response = { json: jest.fn() }
    });

    test("Debe fallar cuando el campo nombre no esta presente", (done) => {
        request.body = {}
        usuariosController.Registrar(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo nombre es obligatorio" })
        done()
    })

    test("Debe fallar cuando el campo email no esta presente", (done) => {
        request.body = {
            nombre: "Diego"
        }
        usuariosController.Registrar(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo email es obligatorio" })
        done()
    })

    test("Debe fallar cuando el campo telefono no esta presente", (done) => {
        request.body = {
            nombre: "Diego",
            email: "diegosanchez@h.com"
        }
        usuariosController.Registrar(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo telefono es obligatorio" })
        done()
    })

    test("Debe fallar cuando el campo password no esta presente", (done) => {
        request.body = {
            nombre: "Diego",
            email: "diegosanchez@h.com",
            telefono: "3003389405"
        }
        usuariosController.Registrar(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo password es obligatorio" })
        done()
    })

    test("Debe registrar el usuario", (done) => {
        request.body = {
            nombre: "Diego",
            email: "diegosanchez@h.com",
            telefono: "3003389405",
            password: "123123"
        }
        usuariosController.Registrar(request, response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: true, mensaje: "Usuario guardado correctamente, verifique su bandeja de entrada" })
            done()
        }, 4000)

    })

    //No me funciono ajustando los tiempos
    test("Debe fallar cuando el email ya existe", (done) => {
        request.body = {
            nombre: "Diego",
            email: "diegosanchez@h.com",
            telefono: "3003389405",
            password: "123123"
        }
        usuariosController.Guardar(request, response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "Ese email ya existe intente con otro" })
            done()
        }, 4000)

    })

    afterAll((done) => {
        usuariosModel.myModel.findOneAndDelete({ email: "diegosanchez@h.com" }).then((respuesta) => {
            done()
        })
    })

})




describe("POST usuarios/guardar", () => {
    let request;
    let response;

    beforeAll((done) => {
        //Conexion a mongo
        mongoose.connect("mongodb://127.0.0.1:27017/ProyectoFinalPrueba").then((respuesta) => {
            console.log("conexion a mongo correcta")
            done()
            //console.log(respuesta)
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body: {} }
        response = { json: jest.fn() }
    });

    test("Debe fallar cuando el campo nombre no esta presente", (done) => {
        request.body = {}
        usuariosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo nombre es obligatorio" })
        done()
    })

    test("Debe fallar cuando el campo email no esta presente", (done) => {
        request.body = {
            nombre: "Diego"
        }
        usuariosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo email es obligatorio" })
        done()
    })

    test("Debe fallar cuando el campo telefono no esta presente", (done) => {
        request.body = {
            nombre: "Diego",
            email: "diegosanchez@h.com"
        }
        usuariosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo telefono es obligatorio" })
        done()
    })

    test("Debe fallar cuando el campo password no esta presente", (done) => {
        request.body = {
            nombre: "Diego",
            email: "diegosanchez@h.com",
            telefono: "3003389405"
        }
        usuariosController.Guardar(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo password es obligatorio" })
        done()
    })

    test("Debe Guardar el usuario", (done) => {
        request.body = {
            nombre: "Diego",
            email: "diegosanchez@h.com",
            telefono: "3003389405",
            password: "123123"
        }
        usuariosController.Guardar(request, response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: true, mensaje: "Usuario guardado correctamente" })
            done()
        }, 4000)

    })


    test("Debe fallar cuando el email ya existe", (done) => {
        request.body = {
            nombre: "Diego",
            email: "diegosanchez@h.com",
            telefono: "3003389405",
            password: "123123"
        }
        usuariosController.Guardar(request, response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "Ese email ya existe intente con otro" })
            done()
        }, 4500)

    })

    afterAll((done) => {
        usuariosModel.myModel.findOneAndDelete({ email: "diegosanchez@h.com" }).then((respuesta) => {
            done()
        })
    })


})



describe("POST usuarios/login", () => {
    let request;
    let response;

    beforeAll((done) => {
        //Conexion a mongo
        mongoose.connect("mongodb://127.0.0.1:27017/ProyectoFinalPrueba").then((respuesta) => {
            console.log("conexion a mongo correcta")
            done()
            //console.log(respuesta)
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body: {} }
        response = { json: jest.fn() }
    });

    test("Debe fallar cuando el campo email no esta presente", (done) => {
        request.body = {}
        usuariosController.Login(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo email es obligatorio" })
        done()
    })

    test("Debe fallar cuando el campo password no esta presente", (done) => {
        request.body = {
            email: "diegosanchez@h.com"
        }
        usuariosController.Login(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo password es obligatorio" })
        done()
    })

    test("Debe Guardar el usuario", (done) => {
        request.body = {
            nombre: "Diego",
            email: "diegosanchez@h.com",
            telefono: "3003389405",
            password: "123123"
        }
        usuariosController.Guardar(request, response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: true, mensaje: "Usuario guardado correctamente" })
            done()
        }, 4000)

    })

    test("Debe solicitar que la cuenta este activa", (done) => {
        request.body = {
            email: "diegosanchez@h.com",
            password: "123123"
        }
        usuariosController.Login(request, response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({ state: true, mensaje: "Por favor activar la cuenta" })
            done()
        }, 40)

    })




})


describe("POST usuarios/listar", () => {
    let request;
    let response;

    beforeAll((done) => {
        //Conexion a mongo
        mongoose.connect("mongodb://127.0.0.1:27017/ProyectoFinalPrueba").then((respuesta) => {
            console.log("conexion a mongo correcta")
            done()
            //console.log(respuesta)
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body: {} }
        response = { json: jest.fn() }
    });

    test("Debe fallar cuando el campo id no esta presente", (done) => {
        request.body = {}
        usuariosController.ListarId(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo _id es obligatorio" })
        done()
    })





})

describe("POST usuarios/eliminar", () => {
    let request;
    let response;

    beforeAll((done) => {
        //Conexion a mongo
        mongoose.connect("mongodb://127.0.0.1:27017/ProyectoFinalPrueba").then((respuesta) => {
            console.log("conexion a mongo correcta")
            done()
            //console.log(respuesta)
        }).catch((error) => {
            console.log(error)
        })

    })

    beforeEach(() => {
        request = { body: {} }
        response = { json: jest.fn() }
    });

    test("Debe fallar cuando el campo id no esta presente", (done) => {
        request.body = {}
        usuariosController.Eliminar(request, response)
        expect(response.json).toHaveBeenCalledWith({ state: false, mensaje: "El campo _id es obligatorio" })
        done()
    })


})







