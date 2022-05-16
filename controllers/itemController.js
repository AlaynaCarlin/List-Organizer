const Express = require('express');
const router = Express.Router();
const { models } = require('../models');
let validateJWT = require("../middleware/validate-jwt");


// * post item
router.post('/create', validateJWT, async (req, res) => {
    const { content, listId } = req.body.item;

    try {
        await models.ItemModel.create({
            content: content,
            listId: listId,
            userId: req.user.id
        })
            .then(
                item => {
                    res.status(201).json({
                        item: item,
                        message: 'item created'
                    });
                }
            )
    } catch (err) {
        res.status(500).json({
            error: `failed to create item: ${err}`
        });
    };
});

// * update item
router.put('/update/:id', validateJWT, async (req, res) => {
    const { content } = req.body.item;
    const itemId = req.params.id;
    const { id } = req.user;

    const query = {
        where: {
            id: itemId,
            userId: id
        }
    };

    const updatedItem = {
        content: content
    };

    try {
        const update = await models.ItemModel.update(updatedItem, query);
        res.status(200).json({
            message: `${update} Item updated`,
            update: updatedItem,
            query: query
        });
    } catch (err) {
        res.status(500).json({ error: err });
        message = 'error updating item'
    }
})

// * delete item
router.delete('/delete/:id', validateJWT, async (req, res) => {
    const itemId = req.params.id;
    const { id } = req.user;

    if (req.user.admin) {
        const query = {
            where: {
                id: itemId
            }
        }

        try {
            const deleteItem = await models.ItemModel.destroy(query);
            res.status(200).json({
                message: `${deleteItem} item deleted`,
                query: query
            });
        } catch (err) {
            res.status(500).json({ error: err });
            message = `error deleting ${err}`
        }
    } else {
        const query = {
            where: {
                id: itemId,
                userId: id
            }
        }

        try {
            const deleteItem = await models.ItemModel.destroy(query);
            res.status(200).json({
                message: `${deleteItem} item deleted`,
                query: query
            });
        } catch (err) {
            res.status(500).json({ verror: err });
            message = 'error deleting'
        }
    }
});


module.exports = router;