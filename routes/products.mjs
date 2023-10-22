import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

//GET methods
router.get('/', async (req, res) => {
    let collection = await db.collection('product').find({}).toArray();
    res.send(collection);
});

router.get("/:id", async (req, res) => {
    const result = await db.collection("product").findOne({ _id: new ObjectId(req.params.id) });
    if (!result) {
        res.status(404).send("Product not found");
        return;
    }
    res.send(result).status(200);
 }); 

 // GET method to find products by name keyword
router.get('/', async (req, res) => {
    if (!req.query.name) {
        res.status(400).send('Name keyword is required');
        return;
    }

    const query = {
        name: { $regex: new RegExp(req.query.name, 'i') } // case-insensitive search
    };

    const collection = await db.collection('product').find(query).toArray();

    if (!collection.length) {
        res.status(404).send('No products found with the given name keyword');
        return;
    }

    res.send(collection);
});

//End of GET methods

//POST method
router.post('/', async (req, res) => {
    const result = await db.collection('product').insertOne(req.body);
    if (!result) {
        res.status(500).send('Insert not successful');
        return;
    }
    res.send(result).status(200);
});
//End of POST method

//PUT method
router.put('/:id', async (req, res) => {
    const result = await db.collection('product').updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    if (!result) {
        res.status(500).send('Update not successful');
        return;
    }
    res.send(result).status(200);
});

//DELETE methods
router.delete('/:id', async (req, res) => {
    const result = await db.collection('product').deleteOne({ _id: new ObjectId(req.params.id) });
    if (!result) {
        res.status(500).send('Delete not successful');
        return;
    }
    res.send(result).status(200);
});

router.delete('/', async (req, res) => {
    const result = await db.collection('product').deleteMany({});
    if (!result) {
        res.status(500).send('Delete not successful');
        return;
    }
    res.send(result).status(200);
});
//End of DELETE methods

export default router;