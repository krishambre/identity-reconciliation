const {Sequelize} = require ('sequelize');
const {dbPassword} = require('./config');
const {dbHost} = require('./config');
const {dbName} = require('./config');
const {dbUser} = require('./config');

module.exports = new Sequelize(dbName,dbUser, dbPassword,{
    host: dbHost,
    dialect: 'postgres',
    operatorAliases: false,
    port: 5432,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});