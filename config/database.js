const {Sequelize} = require ('sequelize');
const {password} = require('./config');

module.exports = new Sequelize('identify','postgres', password,{
    host: 'localhost',
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