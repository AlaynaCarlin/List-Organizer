const router = require('express').Router();
const { models } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post("/register", async (req, res) => {

    const { username, admin, password } = req.body.user;

    try {
        const User = await models.UsersModel.create({
            username,
            admin,
            password: bcrypt.hashSync(password, 13),
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

        res.status(201).json({
            message: "user successfully registered",
            user: User,
            sessionToken: token
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

// 11.3

router.post('/login', async (req, res) => {
    let {username, admin, password} = req.body.user;

    try {
        const loginUser = await models.UsersModel.findOne({
            where: {
                username: username,
            },
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison){

            let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.status(200).json({
                user: loginUser,
                message: "user successfully logged in",
                sessionToken: token
            });

        } else {
            res.status(401).json({
                message: 'Incorrect username or Password'
            })
        }

        } else {
            res.status(401).json({
                message: 'incorrect Username or password'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: `Failed to log in ${err}`,
            error: err
        })
    }
});

module.exports = router;