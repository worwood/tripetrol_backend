const { DataTypes } = require('sequelize');
const sequelize=require('../../DB/connections');

const Compra = sequelize.define('ordenes_de_compra', {
    // Model attributes are defined here
    cheque: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    },
    id_destino: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    garrafas_compradas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_modificacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });


  module.exports ={
    Compra
}