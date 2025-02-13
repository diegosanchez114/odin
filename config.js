var config = {
    email: {}
}
config.puerto= 3000
config.bdPrueba= 'ProyectoFinalPrueba'
config.bd= 'ProyectoFinal'
config.bdUser= "adminBit"
config.bdPass= "admin123"
config.bdIp= "127.0.0.1"
config.bdPort= "27017"

config.secret= "123456oisjfoewirjow3eijweoir-+--++-"

config.urlReal= "http://localhost:4200"

config.email.host= "smtp.gmail.com"
config.email.port= 587
config.email.user= "pruebadecorreo438@gmail.com"
config.email.pass= "vozsosponkmaqoar"

config.expiracion= 60000*5

config.blacklist = [
    "http://localhost:4200",
    "http://localhost:9876",
    "http://localhost:3000"
]

module.exports.config= config