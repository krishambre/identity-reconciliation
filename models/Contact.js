const Sequelize = require('sequelize');
const db = require('../config/database');

const Contact = db.define('contact', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    linkPrecedence: {
        type: Sequelize.BOOLEAN
    },
    deletedAt: {
        type: Sequelize.DATE
    }
}, {
    indexes: [
        {
            fields: ['phoneNumber']
        },
        {
            fields: ['email']
        }
    ],
    schema: 'Contact'
});

module.exports = Contact;