const db = require('../db');

const UsersModel = require('./user');
const ListModel = require('./list');
const ItemModel = require('./item');

// Associations
UsersModel.hasMany(ListModel);
UsersModel.hasMany(ItemModel);

ListModel.belongsTo(UsersModel);
ListModel.hasMany(ItemModel);

ItemModel.belongsTo(ListModel);

module.exports = {
    dbConnections: db,
    models: {
        UsersModel,
        ListModel,
        ItemModel
    }
};

// blue 8.2 models