const {response} =require('express');
const { request } = require('express');
const {Distribucion} =require('../models/data/distribuciones');
const {Cobranza} =require('../models/data/cobranza');
const sequelize=require('../DB/connections');
const { QueryTypes, Sequelize } = require('sequelize');

const distribucionPost = async (req=request,res= response) => {
    const body =req.body;

    try{
        const distribucionBody = {...body.msg,
                            fecha_salida: new Date(Date.now()).toISOString(),
                            fecha_update: new Date(Date.now()).toISOString(),
                        }
        const distribucion = new Distribucion(distribucionBody);
        await distribucion.save();
             
        res.json(
            {msg: {distribucion},
            status: true}        
        )
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg:error,
            status: false
        })
    }
}

const ordenDistribucionSalidaGet = async (req=request,res= response) => {
    try{
       const distribucionSalidaRes = await sequelize.query("SELECT TOP (1000) * FROM [Tripetrol].[dbo].[vDistribucionSalida]");
       if (distribucionSalidaRes){
        res.json({
            msg: {ordenesSalida: distribucionSalidaRes[0]},
            status: true
        });
       }
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:error,

            status: false});
        
    }
}
//
const distribucionRetornoPut = async (req=request,res= response) => {
    const body =req.body;
    const {id} = req.params;
    
    try{
        const distribucion =await Distribucion.findByPk(id);
        if (!distribucion){
            return res.status(400).json({
                msg: `No existe un usario con el id  ${id}`,
                status: false
            })
        }
        const distribucionUpdate = {...body.msg,
                                fecha_retorno: new Date(Date.now()).toISOString(),
                                fecha_update: new Date(Date.now()).toISOString(), 
                                };
        console.log({...distribucionUpdate})
        await Distribucion.update({
            ...distribucionUpdate
        },{
            where: {
                id: id
            }
        }
        );
        const precio_actual = await sequelize.query("SELECT [id],[precio],[fecha],[id_user]FROM [Tripetrol].[dbo].[historial_precios] WHERE id = (SELECT max(id) FROM [Tripetrol].[dbo].[historial_precios])");
        console.log(precio_actual[0][0])
        const cobranzabody = {
            id_distribucion: id,
            id_precio_unitario: precio_actual[0][0].id,
            monto_a_cobrar: precio_actual[0][0].precio*body.msg.carga_vendida,
            id_user_creacion: body.msg.id_user_retorno,
            id_user_update: body.msg.id_user_retorno,
            fecha_creacion: new Date(Date.now()).toISOString(),
            fecha_update: new Date(Date.now()).toISOString(),
        }
        const cobranza = new Cobranza(cobranzabody);
        await cobranza.save();

        const distribucion2 =await Distribucion.findByPk(id);        
        res.json({msg: distribucion2,
        status: true})
    }catch(error){        
        console.log(error);
        res.status(500).json({
            msg:error,
            status: false});
    }
}

module.exports={
    distribucionPost,
    ordenDistribucionSalidaGet,
    distribucionRetornoPut,
}