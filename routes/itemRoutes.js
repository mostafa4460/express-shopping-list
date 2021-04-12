const express = require("express");
const router = new express.Router();
const list = require("../fakeDb");

router.get('/', (req, res) => {
    return res.json(list);
})

router.post('/', (req, res) => {
    const { name, price } = req.body;
    list.push({name, price});
    return res.status(201).json({
        added: { name, price }
    });
})

router.get('/:name', (req, res) => {
    const item = list.find(i => i.name === req.params.name);
    return res.json(item);
})

router.patch('/:name', (req, res) => {
    const item = list.find(i => i.name === req.params.name);
    const { name, price } = req.body;
    item.name = name;
    item.price = price;
    return res.json({updated: item});
})

router.delete('/:name', (req, res) => {
    const item = list.find(i => i.name === req.params.name);
    list.splice(item, 1);
    return res.json({message: "Deleted"});
})

module.exports = router;