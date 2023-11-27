const { DataTypes } = require('sequelize');
const sequelize=require('../../DB/connections');

const Remesa = sequelize.define('remesas', {
    // Model attributes are defined here
    orden_remesa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    monto: {
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
    Remesa
}