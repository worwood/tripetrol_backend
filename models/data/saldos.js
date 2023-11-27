const { DataTypes } = require('sequelize');
const sequelize=require('../../DB/connections');

const Saldo = sequelize.define('historial_saldos', {
    // Model attributes are defined here
    saldo_inicial: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: true
    },
    saldo_final: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: true
    },
    monto: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: true
    },
    id_camion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_distribucion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_update: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_user_creacion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_user_update: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });


  module.exports ={
    Saldo
}