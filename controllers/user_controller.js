const {response} = require('express');
const { request } = require('express');
const bcryptjs = require('bcryptjs');
const {Usuario} = require('../models/data/users');

const usuariosPost = async (req=request,res= response) => {

   
    const {msg} = req.body;
    const {password} = msg;
    const salt = bcryptjs.genSaltSync();
    msg.password = bcryptjs.hashSync(password,salt);
    console.log(msg);

    try{        
        const usuario= new Usuario(msg);
        await usuario.save();
        res.json({usuario, ok:true});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Algo salio mal, comuniquese con el administrador'
        })
    }
}

module.exports ={
     usuariosPost,
}