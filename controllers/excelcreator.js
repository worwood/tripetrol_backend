const excel = require('excel4node');
const excelFile = new excel.Workbook();
const {response} =require('express');
const { request } = require('express');
const sequelize=require('../DB/connections');
const { QueryTypes, Sequelize } = require('sequelize');

const downloadExcel = async (req=request,res= response) => {
        try{
            const body =req.body;
            console.log(body.msg)
            const distribuciones = await sequelize.query(`SELECT TOP (1000) * FROM [Tripetrol].[dbo].[distribucion_report] WHERE fecha_retorno between '${body.msg.date_inicio}' and '${body.msg.date_final}'`);
            if (distribuciones){
                const lista = distribuciones[0];
                
                const worksheet = excelFile.addWorksheet('Reporte');
                console.log(lista.length)
                console.log(Object.keys(lista[1]).length)
                for (let fila=0; fila < lista.length; fila++ ){
                    for (let columna=0; columna <Object.keys(lista[1]).length; columna++){
                        worksheet.cell(fila+1,columna+1).string(String(lista[fila][Object.keys(lista[1])[columna]]))
                        console.log(
                            lista[fila][Object.keys(lista[1])[columna]]
                        )
                    }
                }
                excelFile.write('report.xlsx',res)     
                
            }
        }catch(error){            
            console.log(error);
            res.status(500).json({
                msg:error,
                status: false});
        }
}



module.exports={
    downloadExcel,
}