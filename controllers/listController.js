const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const {models} = require('../models');

router.get('/pretend', validateJWT, (req, res) => {
    res.send("Hey!! Wassup!")
});

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

// 12.3.4
// look into the endpoints I need


module.exports = router;