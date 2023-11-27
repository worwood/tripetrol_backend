const { DataTypes } = require('sequelize');
const sequelize=require('../../DB/connections');

const Usuario = sequelize.define('usuario', {
    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    google_create: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });


  module.exports ={
    Usuario
}