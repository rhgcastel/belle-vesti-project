const Item = require('../models/item-model')

//Create an item
const createItem = async (req, res) => {
    const { sku, title, price, description, category, image, rating, quantity } = req.body;
    Number.parseFloat(price).toFixed(2)
    let item = await Item.findOne({ sku });
    if (item)
        return res.status(409).json('This SKU is already being used.')
    if (sku.length !== 10)
        return res.status(400).json('SKU should be 10 characters.')
    if (title.length > 50)
        return res.status(400).json('Title should be no longer than 50 characters.')
    
    let data = { sku, title, price, description, category, image, rating, quantity };
    item = await Item.create(data);
    return res.status(201).json('New item successfully created.');
};

//Request a list with all the registered items
const getItemsList = async (req, res) => {
    try {
        const itemsList = await Item.find();
        res.status(200).json(itemsList)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

//Request an item information
const getItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('Item not found.')
    return res.status(200).json(item);
};

//Update an item information
const updateItem = async (req, res) => {
    const { sku, title, price, description, category, image, rating, quantity } = req.body;
    Number.parseFloat(price).toFixed(2)
    const data = { sku, title, price, description, category, image, rating, quantity };
    const updatedData = await Item.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updatedData) return res.status(404).json("Id not found.")
    return res.status(200).json(updatedData);
};

//Delete an item
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (item) return res.status(200).json('Item deleted.');
        return res.status(404).json('Item not found')
      } catch (err) {
        res.status(500).json({message: err.message})
      }
}

module.exports = { createItem, getItemsList, getItem, updateItem, deleteItem };