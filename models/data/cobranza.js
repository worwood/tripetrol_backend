const { DataTypes } = require('sequelize');
const sequelize=require('../../DB/connections');

const Cobranza = sequelize.define('registros_de_cobranza', {
    // Model attributes are defined here
    id_distribucion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_precio_unitario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    monto_a_cobrar: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    renta_cobrada: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    renta_por_cobrar: {
      type: DataTypes.DECIMAL(15,2),
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
    fecha_cobro: {
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
    id_user_cobro: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });


  module.exports ={
    Cobranza
}