const Sequelize = require('sequelize')
const db = require('../config/Database')

const Brand = require('./brandModel')
const Type = require('./typeModel')

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
    "id_brand": {
        type: Sequelize.INTEGER
    },
    "id_type": {
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
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    "product_wish": {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
}, {
    freezeTableName: true
}
)

Brand.hasMany(Product, { foreignKey: 'id_brand' })
Type.hasMany(Product, { foreignKey: 'id_type' })

Product.belongsTo(Brand, { foreignKey: 'id_brand' })
Product.belongsTo(Type, { foreignKey: 'id_type' })


module.exports = Product