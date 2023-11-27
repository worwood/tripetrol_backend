// sequelize.js
const Sequelize = require('sequelize');

// Note that you must use a SQL Server login -- Windows credentials will not work.
const sequelize = new Sequelize('tripetrol', 'tripetrol', '1668822Lp', {
    dialect: 'mssql',
    host: 'tripetrol-db-server.database.windows.net',
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    }
})
module.exports=sequelize;
//Server=localhost;Database=master;Trusted_Connection=True;