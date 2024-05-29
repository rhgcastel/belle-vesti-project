const express = require('express');
const router = express.Router();
const { createItem, getItemsList, getItem, updateItem, deleteItem } = require('../controllers/items-controller');
const { validateCreateItem } = require('../middlewares/validator');

router.post('/api/item', validateCreateItem, createItem);
router.get('/api/items-list', getItemsList);
router.get('/api/item/:id', getItem);
router.put('/api/item/:id', validateCreateItem, updateItem);
router.delete('/api/item/:id', deleteItem);

module.exports = router;
