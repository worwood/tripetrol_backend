const {response} = require('express');
const { request } = require('express');
const {Compra} =require('../models/data/compra');
const {Traslado} =require('../models/data/traslados');
const sequelize=require('../DB/connections');
const { QueryTypes, Sequelize } = require('sequelize');
//
const ordenCompraSalidaGet = async (req=request,res= response) => {
    try{
       const ordenesSalidaRes = await sequelize.query("SELECT TOP (1000) * FROM [Tripetrol].[dbo].[vTrasladoSalida]");
       if (ordenesSalidaRes){
        res.json({
            msg: {ordenesSalida: ordenesSalidaRes[0]},
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
const trasladoRetornoPut = async (req=request,res= response) => {
    const body =req.body;
    const {id} = req.params;
    
    try{
        const traslado =await Traslado.findByPk(id);
        if (!traslado){
            return res.status(400).json({
                msg: `No existe un usario con el id  ${id}`,
                status: true
            })
        }
        const trasladoUpdate = {...body.msg,
                                fecha_retorno: new Date(Date.now()).toISOString(),
                                fecha_update: new Date(Date.now()).toISOString(), 
                                };
        console.log({...trasladoUpdate})
        await Traslado.update({
            ...trasladoUpdate
        },{
            where: {
                id: id
            }
        }
        );
        const traslado2 =await Traslado.findByPk(id);        
        res.json({msg: traslado2,
        status: true})
    }catch(error){        
        console.log(error);
        res.status(500).json({
            msg:error,
            status: false});
    }
}
//
const compraPost = async (req=request,res= response) => {
    const body =req.body;

    try{
        const {cheque, monto, id_destino, garrafas_compradas,id_user,camiones} = body.msg;
        const compraBody = {cheque,
                            monto,
                            id_destino, 
                            garrafas_compradas,
                            id_user,
                            fecha_creacion: new Date(Date.now()).toISOString(),
                            fecha_modificacion: new Date(Date.now()).toISOString(),
                        }
        const compra=new Compra(compraBody);
        await compra.save();
        for (const e of camiones){
            camion = { id_camion: e.id,
                id_compra: compra.id,
                id_destino,
                garrafas_salida: e.garrafas_salida,
                fecha_salida: new Date(Date.now()).toISOString(),  
                fecha_update: new Date(Date.now()).toISOString(),
                id_user_salida: id_user 
               }   
               const traslado= new Traslado(camion)
               await traslado.save();

        }                
        res.json(
            {msg: {compra},
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

module.exports={
    compraPost,
    ordenCompraSalidaGet,
    trasladoRetornoPut
}