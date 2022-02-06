const Sequelize = require('sequelize')
const db = require('../config/Database')

const Product = require('./productsModel')
const User = require('./userModel')

const Wish = db.define(
    "wish", {
    'id_wish': {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    'id_product': {
        type: Sequelize.INTEGER
    },
    'id_user': {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true
}
)

Product.hasMany(Wish, { foreignKey: 'id_product' })
Wish.belongsTo(Product, { foreignKey: 'id_product' })

User.hasMany(Wish, { foreignKey: 'id_user' })
Wish.belongsTo(User, { foreignKey: 'id_user' })

module.exports = Wish