const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Contact = require('../models/contact');

function findOrCreateContact(email, phoneNumber) {
    return Contact.findOne({
        where: { email, phoneNumber }
    }).then(contact => {
        if (contact) {
            // If a contact with both the email and phone number exists, return it
            return contact;
        } else {
            // Otherwise, find all contacts with the same email or phone number
            return findAllContacts(email, phoneNumber)
                .then(contacts => {
                    const contactsWithNullLinkedId = contacts.filter(contact => contact.linkedId === null);
                    const uniqueLinkedIds = [...new Set(contacts.map(contact => contact.linkedId).filter(id => id !== null))];

                    if ((email && phoneNumber) && (contactsWithNullLinkedId.length > 1 || uniqueLinkedIds.length > 1)) {
                        // Sort contacts by createdAt in ascending order
                        contacts.sort((a, b) => a.createdAt - b.createdAt);
                    
                        // The oldest contact is the first one in the sorted array
                        const primaryContact = contacts[0];
                    
                        // Update all other contacts to link them to the primary contact
                        const updatePromises = contacts.slice(1).map(contact => 
                            contact.update({ linkedId: primaryContact.id, linkPrecedence: false })
                        );
                    
                        return Promise.all(updatePromises).then(() => primaryContact);
                    } else if((email && phoneNumber)){
                        // If there are no existing contacts, create a new primary contact
                        return Contact.create({
                            email,
                            phoneNumber,
                            linkPrecedence: contacts.length==0?true:false,
                            linkedId: contacts.length==0?null:contacts[0].linkedId==null?contacts[0].id:contacts[0].linedkId
                        });
                    } else {
                        return contacts[0];
                    }
                });
        }
    });
}

function findAllContacts(email, phoneNumber) {
    return Contact.findAll({
        where: {
            [Op.or]: [
                { email },
                { phoneNumber }
            ]
        },
        order: [['createdAt', 'ASC']]
    });
}

function findAllContactsByLinkedId(linkedId) {
    return Contact.findAll({
        where: {
            [Op.or]:[
                {linkedId: linkedId},
                {id: linkedId}
            ]
        },
        order: [['createdAt', 'ASC']]
    });
}

function formatResponse(contact, contacts) {
    const primaryContact = contacts.find(c => c.linkPrecedence);
    return {
        contact: {
            primaryContactId: primaryContact.id,
            emails: contacts.map(c => c.email),
            phoneNumbers: contacts.map(c => c.phoneNumber),
            secondaryContactIds: contacts.filter(c => c.id !== primaryContact.id).map(c => c.id)
        }
    };
}

router.post('/', (req, res) => {
    const { email, phoneNumber } = req.body;
    findOrCreateContact(email, phoneNumber)
        .then(contact => findAllContactsByLinkedId(contact.linkedId!=null?contact.linkedId:contact.id)
            .then(contacts => res.json(formatResponse(contact, contacts))))
        .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;