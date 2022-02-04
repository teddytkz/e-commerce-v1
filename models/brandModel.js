const Sequelize = require('sequelize')
const db = require('../config/Database')

const Brand = db.define(
    "brand", {
    "id_brand": {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    "brand_name": {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true
}
)

module.exports = Brand