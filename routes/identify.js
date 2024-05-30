const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Contact = require('../models/contact');

router.post('/', (req,res) => res.send('identify'));

module.exports = router;