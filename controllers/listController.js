const Express = require('express');
const router = Express.Router();

router.get('/pretend', (req, res) => {
    res.send("Hey!! Wassup!")
});

module.exports = router;