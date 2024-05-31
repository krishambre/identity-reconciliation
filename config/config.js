const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbHost: process.env.DB_HOST,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER
};