const express = require('express');
const router = new express.Router();
const list = require('./list');
const view = require('./view');
const add = require('./add');
const deleteRequest = require('./delete');
const edit = require('./edit');

router.get('/list', list);
router.post('/add', add);
router.patch('/:id/edit', edit);
router.get('/:id/view', view);
router.delete('/:id/delete', deleteRequest);

module.exports = router;
