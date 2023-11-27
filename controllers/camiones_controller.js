const {response} =require('express');
const { request } = require('express');

const sequelize=require('../DB/connections');
const { QueryTypes, Sequelize } = require('sequelize');

const camionesGet = async (req,res= response) => {
    
    const camiones = await sequelize.query("SELECT TOP (1000) [id],[placa],[propietario],[no_camion],[chofer],[fecha_update] FROM [Tripetrol].[dbo].[camiones]")
    if(camiones)
    res.json({camions: camiones[0],
        status: true,

    });
}

module.exports={
    camionesGet,
}