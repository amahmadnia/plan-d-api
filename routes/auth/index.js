const express = require('express');
const router = new express.Router();
const login = require('./login');

router.post('/login', login);

module.exports = router;
