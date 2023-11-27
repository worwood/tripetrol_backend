const {response} =require('express');
const { request } = require('express');
const {Cobranza} =require('../models/data/cobranza');
const {Caja} =require('../models/data/operacion_caja');
const {Saldo} =require('../models/data/saldos');
const {Remesa} =require('../models/data/remesas');
const sequelize=require('../DB/connections');
const { QueryTypes, Sequelize } = require('sequelize');

const cobranzasIncompletasGet = async (req=request,res= response) => {
    try{
       const cobrosRes = await sequelize.query("SELECT TOP (1000) * FROM [Tripetrol].[dbo].[vCobrosIncompletos]");
       if (cobrosRes){
        res.json({
            msg: {ordenesSalida: cobrosRes[0]},
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
const saldoCajaGet = async (req=request,res= response) => {
    try{
       const saldoCaja = await sequelize.query("select saldo_final from [Tripetrol].[dbo].[operaciones_de_caja] where id = (select max(id) from [Tripetrol].[dbo].[operaciones_de_caja])");
       if (saldoCaja){
        res.json({
            msg: {saldo: saldoCaja[0]},
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


const cobranzaPut = async (req=request,res= response) => {
    const body =req.body;
    const {id} = req.params;
    
    try{
        const cobranza =await Cobranza.findByPk(id);
        if (!cobranza){
            return res.status(400).json({
                msg: `No existe registro de la cobranza ${id}`,
                status: false
            })
        }

        const cobranzaupdate = {...body.msg,
                                id_user_update: body.msg.id_user,
                                id_user_cobro: body.msg.id_user,
                                fecha_cobro: new Date(Date.now()).toISOString(),
                                fecha_update: new Date(Date.now()).toISOString(), 
                                };                               
        
        console.log({...cobranzaupdate})
        await Cobranza.update({
            ...cobranzaupdate
        },{
            where: {
                id: id
            }
        }
        );

        const saldo_caja = await sequelize.query(`SELECT [id],[saldo_final] FROM [Tripetrol].[dbo].[operaciones_de_caja] WHERE id = (SELECT max(id) FROM [Tripetrol].[dbo].[operaciones_de_caja])`);
        console.log(saldo_caja[0][0])
        const cajaBody = {
            saldo_inicial: saldo_caja[0][0].saldo_final,
            saldo_final: saldo_caja[0][0].saldo_final+body.msg.renta_cobrada,
            monto: body.msg.renta_cobrada,
            id_transaccion: id,
            id_tipo_transaccion: 1,
            fecha_creacion: new Date(Date.now()).toISOString(),
            fecha_update: new Date(Date.now()).toISOString(),
            id_user_creacion: body.msg.id_user,
            id_user_update: body.msg.id_user,
        }
        const caja = new Caja(cajaBody);
        await caja.save();
        
        if(body.msg.renta_por_cobrar !== 0){
            const saldo_camion = await sequelize.query(`SELECT [id],[saldo_final] FROM [Tripetrol].[dbo].[historial_saldos] WHERE id = (SELECT max(id) FROM [Tripetrol].[dbo].[historial_saldos]) AND [id_camion] = ${body.msg.id_camion}`);
           
                const saldobody = {                    
                    saldo_inicial: saldo_camion[0][0] ? saldo_camion[0][0].saldo_final : 0 ,
                    saldo_final: saldo_camion[0][0] ? saldo_camion[0][0].saldo_final+body.msg.renta_por_cobrar : body.msg.renta_por_cobrar,
                    monto: body.msg.renta_por_cobrar,
                    id_camion: body.msg.id_camion,
                    id_distribucion: body.msg.id_distribucion,
                    fecha_creacion: new Date(Date.now()).toISOString(),
                    fecha_update: new Date(Date.now()).toISOString(),
                    id_user_creacion: body.msg.id_user,
                    id_user_update: body.msg.id_user,
                };
                const saldo = new Saldo(saldobody);
                await saldo.save();
        } 

        const cobranza2 =await Cobranza.findByPk(id);        
        res.json({msg: cobranza2,
        status: true})
    }catch(error){        
        console.log(error);
        res.status(500).json({
            msg:error,
            status: false});
    }
}


const remesasPost = async (req=request,res= response) => {
    const body =req.body;

    try{
        const remesaBody = {...body.msg,
                            fecha_creacion: new Date(Date.now()).toISOString(),
                            fecha_update: new Date(Date.now()).toISOString(),
                            id_user_creacion: body.msg.id_user,
                            id_user_update: body.msg.id_user,
                            
                        };
        const remesa = new Remesa(remesaBody);
        await remesa.save();
        
        const saldo_caja = await sequelize.query(`SELECT [id],[saldo_final] FROM [Tripetrol].[dbo].[operaciones_de_caja] WHERE id = (SELECT max(id) FROM [Tripetrol].[dbo].[operaciones_de_caja])`);
        console.log(saldo_caja[0][0])
        const cajaBody = {
            saldo_inicial: saldo_caja[0][0].saldo_final,
            saldo_final: saldo_caja[0][0].saldo_final-body.msg.monto,
            monto: body.msg.monto*-1,
            id_transaccion: remesa.id,
            id_tipo_transaccion: 2,
            fecha_creacion: new Date(Date.now()).toISOString(),
            fecha_update: new Date(Date.now()).toISOString(),
            id_user_creacion: body.msg.id_user,
            id_user_update: body.msg.id_user,
        }
        const caja = new Caja(cajaBody);
        await caja.save();

        res.json(
            {msg: {remesa},
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

const saldosPost = async (req=request,res= response) => {
    const body =req.body;

    try{        
        const saldo_camion = await sequelize.query(`SELECT [id],[saldo_final] FROM [Tripetrol].[dbo].[historial_saldos] WHERE id = (SELECT max(id) FROM [Tripetrol].[dbo].[historial_saldos] WHERE [id_camion] = ${body.msg.id_camion})`);
        console.log(saldo_camion)
        const saldoBody = {
            saldo_inicial: saldo_camion[0][0].saldo_final,
            saldo_final: saldo_camion[0][0].saldo_final-body.msg.monto,
            monto: body.msg.monto*-1,
            id_camion: body.msg.id_camion,
            fecha_creacion: new Date(Date.now()).toISOString(),
            fecha_update: new Date(Date.now()).toISOString(),
            id_user_creacion: body.msg.id_user,
            id_user_update: body.msg.id_user,
        }
        const saldo = new Saldo(saldoBody);
        await saldo.save();
        const saldo_caja = await sequelize.query(`SELECT [id],[saldo_final] FROM [Tripetrol].[dbo].[operaciones_de_caja] WHERE id = (SELECT max(id) FROM [Tripetrol].[dbo].[operaciones_de_caja])`);
        const cajaBody = {
            saldo_inicial: saldo_caja[0][0].saldo_final,
            saldo_final: saldo_caja[0][0].saldo_final+body.msg.monto,
            monto: body.msg.monto*1,
            id_transaccion: saldo.id,
            id_tipo_transaccion: 3,
            fecha_creacion: new Date(Date.now()).toISOString(),
            fecha_update: new Date(Date.now()).toISOString(),
            id_user_creacion: body.msg.id_user,
            id_user_update: body.msg.id_user,
        }
        const caja = new Caja(cajaBody);
        await caja.save();
        res.json(
            {msg: {saldo},
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

const camionesSaldosGet = async (req=request,res= response) => {
    try{
       const saldosCamiones = await sequelize.query("SELECT TOP (1000) [saldo_final],[id],[no_camion],[placa],[id_camion] FROM [Tripetrol].[dbo].[vCamionesSaldos]");
       if (saldosCamiones){
        res.json({
            msg: {camiones: saldosCamiones[0]},
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


module.exports={
    saldoCajaGet,
    cobranzasIncompletasGet,
    cobranzaPut,
    remesasPost,
    saldosPost,
    camionesSaldosGet
}