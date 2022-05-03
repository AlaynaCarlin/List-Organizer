const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const {models} = require('../models');

router.get('/pretend', validateJWT, (req, res) => {
    res.send("Hey!! Wassup!")
});

// * Create a List
router.post('/create', validateJWT, async (req, res) => {
    const {title, date, complete} = req.body.list;
    const {id} = req.user;
    const listEntry = {
        title,
        date,
        complete,
        owner: id
    }
    try {
        const newList = await models.ListModel.create(listEntry);
        res.status(200).json({newList});
    } catch (err) {
        res.status(500).json({error: err});
    }
    models.ListModel.create(listEntry)
});

// * Update a List

// * Delete a List

// * Get all Lists
router.get('/', async (req, res) => {
    try {
    const entries = await models.ListModel.findAll();
    res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// * Get a list by id

// * Get a list by title

// * Get list by user
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;

    try {
        const userLists = await models.ListModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLists);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



module.exports = router;