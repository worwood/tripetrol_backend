const { DataTypes } = require('sequelize');
const sequelize=require('../../DB/connections');

const Cheque = sequelize.define('Cheque', {
    // Model attributes are defined here
    No_CHEQUE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_ADMIN: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RURAL: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    IMPORTE: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    ANULADO: {
      type: DataTypes.BOOLEAN,
      defaultValue: false 
    },
    No_GARRAFAS: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    FECHA_PETICION: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    ID_VALIDADOR: {
      type: DataTypes.INTEGER,
      allowNull: true 
    },
    FECHA_VALIDACION: {
      type: DataTypes.DATE,
      allowNull: true 
    },
    CANTIDAD_CAMIONES: {
      type: DataTypes.INTEGER,
      allowNull: true 
    },
    ID_CAMIONES: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    COMENTARIOS: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    PETICION: {
      type: DataTypes.BOOLEAN,
      defaultValue: true 
    },
  }, {
    timestamps: false
  });


  module.exports ={
    Cheque
}