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

// * update comment

// * delete comment


module.exports = router;