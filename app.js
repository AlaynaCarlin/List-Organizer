require('dotenv').config();
const Express = require("express"); // require the use of express npm package that we installed
const app = Express(); // we create an express app
const bodyParser = require('body-parser')
const dbConnection = require ('./db');
const controllers = require("./controllers");
const middleware = require('./middleware/headers');

app.use(bodyParser.json())


app.use(Express.json());

app.use('/list', controllers.listController);
app.use('/item', controllers.itemController);
app.use('/user', controllers.userController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[server]: Server crashed. Error = ${err}`);
    });



