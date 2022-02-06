const Sequelize = require('sequelize')
const db = require('../config/Database')
const Product = require('./productsModel')

const productImages = db.define(
    'productimages', {
    'id': {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'id_product': {
        type: Sequelize.INTEGER
    },
    'file_path': {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true
})

Product.hasMany(productImages, { foreignKey: 'id_product' })
productImages.belongsTo(Product, { foreignKey: 'id_product' })

module.exports = productImages