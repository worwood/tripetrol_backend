const { DataTypes } = require('sequelize');
const sequelize=require('../../DB/connections');

const Distribucion = sequelize.define('registros_de_distribucion', {
    // Model attributes are defined here
    id_camion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_destino: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carga_salida: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carga_retorno: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    carga_perdida: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    carga_vendida: {
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
    Distribucion
}