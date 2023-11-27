const express = require('express');
const cors = require('cors');

const sequelize=require('../DB/connections.js');

class Server{

    constructor(){

        this.app =express();
        this.port=process.env.PORT

        this.camionesPath='/db/camiones'
        this.comprasPath='/db/compras'
        this.distribucionesPath='/db/distribuciones'
        this.cobranzasPath='/db/cobranzas'
        this.usuariosPath = '/user'
        this.authPath = '/auth'
        this.excelPath = '/excel'


        //database
        this.dbConnection();
        //middlewares
        this.middlewares();
        //Rutas de aplicacion (Endpoint)
        this.routes();
    }

    async dbConnection(){
        
                sequelize
                    .authenticate()
                    .then(function (err) {
                        console.log('Database connection has been established successfully.');
                    })
                    .catch(function (err) {
                        console.log('Unable to connect to the database:', err);
                        throw err;
                    });
        
    }


    middlewares(){


        //CORS
        this.app.use(cors())
        // Directorio publico
        this.app.use(express.static('public'))
        //Lectura del Body tipo JSON
        this.app.use(express.json());
    }

    routes(
    ){        
        this.app.use(this.authPath,require('../routes/auth.js'));
        this.app.use(this.camionesPath,require('../routes/camiones.js'))
        this.app.use(this.comprasPath,require('../routes/orden_de_compra.js'))
        this.app.use(this.distribucionesPath,require('../routes/orden_de_distribucion.js'))
        this.app.use(this.cobranzasPath,require('../routes/cobranzas_remesas.js'))
        this.app.use(this.usuariosPath,require('../routes/user.js'))
        this.app.use(this.excelPath,require('../routes/excel.js'))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto ',this.port )
        })
    }

}
module.exports=Server;