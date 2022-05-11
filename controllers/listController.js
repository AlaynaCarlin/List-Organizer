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
router.put('/update/:id', validateJWT, async (req, res) => {
    const { title, date, complete } = req.body.list;
    const listId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: listId,
            userId: userId
        }
    };

    const updateList = {
        title: title,
        date: date,
        complete: complete
    };
    console.log(updateList);

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
router.delete('/delete/:id', validateJWT, async (req, res) => {
    const listId = req.params.id;
    const { id } = req.user;

    if (req.user.admin) {
        const query = {
            where: {
                id: listId
            }
        };

        try {
            const deleteList = await models.ListModel.destroy(query);
            res.status(200).json({
                message: `${deleteList} list Deleted`,
                query: query
            });
        } catch (err) {
            res.status(500).json({ error: err });
            message = 'error deleting'
        }
    } else {
        const query = {
            where: {
                id: listId,
                userId: id
            }
        };

        try {
            const deleteList = await models.ListModel.destroy(query);
            res.status(200).json({
                message: `${deleteList} list deleted`,
                query: query
            });
        } catch (err) {
            res.status(500).json({ error: err });
            message = 'error deleting'
        }
    }
});

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

// * Get a list and items by id
router.get('/:id', validateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        const results = await models.ListModel.findOne({
            where: { id: id }
        })

        const items = await models.ItemModel.findAll({
            where: {
                listId: id
            }
        })
        res.status(200).json({
            list: results,
            items: items
        });
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