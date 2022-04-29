// const Express = require('express');
const router = require('express').Router();
const { models } = require("../models");

router.get('/different', (req, res) => {
    res.send("Hey!! Wassup!")
});

router.post("/register", async (req, res) => {

   let {username, admin, password} = req.body.user;

   await models.UsersModel.create({
       username,
       admin,
       password
   });

   res.send("this is our register endpoint");
});

module.exports = router;