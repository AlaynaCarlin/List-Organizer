const { DataTypes } = require("sequelize");
const db = require("../db");

const Items = db.define("items", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        required: true,
    }
});

module.exports = Items;