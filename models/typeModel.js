const Sequelize = require('sequelize')
const db = require('../config/Database')

const Type = db.define(
    "type", {
    "id_type": {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, "type_name": {
        type: Sequelize.TEXT
    }
},
    {
        freezeTableName: true
    }
)

module.exports = Type