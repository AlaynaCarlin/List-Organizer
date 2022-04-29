// const Express = require('express');
const router = require('express').Router();
const { models } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");

router.get('/different', (req, res) => {
    res.send("Hey!! Wassup!")
});

router.post("/register", async (req, res) => {

    let { username, admin, password } = req.body.user;

    try {
        const User = await models.UsersModel.create({
            username,
            admin,
            password
        });

        res.status(201).json({
            message: "user successfully registered",
            user: User
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'username already in use',
            });
        } else {
            res.status(500).json({
                message: 'Failed to register user'
            });
        }
    }
});

// LOGIN ****** 4/30

module.exports = router;