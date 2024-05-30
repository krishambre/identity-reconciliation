const Sequelize = require('sequelize');
const db = require('../config/database');

const Contact = db.define('contact', {
    id: {
        type: Sequelize.INTEGER
    },
    phoneNumber: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    linkedId: {
        type: Sequelize.INTEGER
    },
    id: {
        type: Sequelize.INTEGER
    },
    linkedPrecedence: {
        type: Sequelize.BOOLEAN
    },
    deletedAt: {
        type: Sequelize.DATE
    }
});