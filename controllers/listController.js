const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { models } = require('../models');

router.get('/pretend', validateJWT, (req, res) => {
    res.send("Hey!! Wassup!")
});

// * Create a List
router.post('/create', validateJWT, async (req, res) => {
    const { title, date, complete } = req.body.list;
   
    try {
        await models.ListModel.create({
            title: title,
            date:date,
            complete: complete,
            userId: req.user.id
        })
            .then(
                list => {
                    res.status(201).json({
                        list: list,
                        message: 'successfully posted'
                    });
                }
            )
        
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// * Update a List
router.put('/update/:entryId', validateJWT, async (req, res) => {
    const { title, date, complete } = req.body.list;
    const listId = req.params.entryId;
    const {id} = req.user;

    const query = {
        where: {
            id: listId,
            userId: id
        }
    };

    const updateList = {
        title: title,
        date: date,
        complete: complete
    };

    try {
        const update = await models.ListModel.update(updateList, query);
        res.status(200).json({
            message: `${update} List successfully updated`,
            update: updateList,
            query: query
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

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

// 12.3.4 blue

// * Get a list by id
router.get('/:id', validateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        const results = await models.ListModel.findAll({
            where: { id: id }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


// * Get a list by title
router.get('/:title', validateJWT, async (req, res) => {
    const { title } = req.params;
    try {
        const results = await models.ListModel.findAll({
            where: { title: title }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// * Get list by user
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;

    try {
        const userLists = await models.ListModel.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userLists);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



module.exports = router;