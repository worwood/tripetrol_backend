const { DataTypes } = require('sequelize');
const sequelize=require('../../DB/connections');

const Traslado = sequelize.define('registros_de_traslado', {
    // Model attributes are defined here
    id_camion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_compra: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    },
    id_destino: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    garrafas_salida: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    garrafas_retorno: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    garrafas_perdidas: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fecha_salida: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_retorno: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_update: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_user_salida: {
        type: DataTypes.INTEGER,
        allowNull: true
    },    
    id_user_retorno: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });


  module.exports ={
    Traslado
}