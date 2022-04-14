const Express = require("express"); // require the use of express npm package that we installed
const app = Express(); // we create an express app

const controllers = require("./controllers");

app.use('/list', controllers.listController);
app.use('/item', controllers.itemController);
app.use('/user', controllers.userController);

app.listen(3000, () => { // we use express to start a UNIX socket and listen for connections on a given path. the given path is localhost 3000
    console.log(`[Server]: App is listening on 3000.`); // consol.logs when the server is running
});

