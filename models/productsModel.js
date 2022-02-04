const Sequelize = require('sequelize')
const db = require('../config/Database')

const Brand = require('./brandModel')

const Product = db.define(
    "product", {
    "id_product": {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    "product_name": {
        type: Sequelize.TEXT
    },
    "product_description": {
        type: Sequelize.TEXT
    },
    "product_brand": {
        type: Sequelize.STRING
    },
    "product_type": {
        type: Sequelize.INTEGER
    },
    "product_price": {
        type: Sequelize.FLOAT
    },
    "product_discount": {
        type: Sequelize.FLOAT
    },
    "product_images": {
        type: Sequelize.TEXT
    },
    "product_view": {
        type: Sequelize.INTEGER
    },
}, {
    freezeTableName: true
}
)

Product.hasOne(Brand, { foreignKey: 'id_brand' })
Product.belongsTo(Brand, { foreignKey: 'product_brand' })

module.exports = Product