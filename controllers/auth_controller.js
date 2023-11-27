const {response} =require('express');
const { request } = require('express');
const bcryptjs= require('bcryptjs');

const {Usuario} =require('../models/data/users');
const {generarJWT}=require('../helpers/generar-jws');

const login= async(req=request, res=response) => {



    const {msg} = req.body;
    console.log(msg)
    const {correo, password} = msg;
    try{

        //verificar si el email existe
        const usuario =await Usuario.findOne({
            where: {
                correo: correo
            }
        });

        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos',
                t_status: false,
                status: false
            })
        }
        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password)
        if (!validPassword){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos',
                t_status: false,
                status: false
            })
            
        }
        //Generar el JWT
       const token =await generarJWT( usuario.id )

        res.json({ msg:{usuario},
            t_status: true,
            status: true,
            token
            
        })
    } catch (error) {
        return res.status(500).json({
            msg:'Hable con el administrador',
            t_status: false,
            status: false
        })
    }




}


module.exports= {login}