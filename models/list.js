const { DataTypes } = require("sequelize");
const db = require("../db");

const Lists = db.define("lists", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});

module.exports = Lists;