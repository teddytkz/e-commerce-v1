const Sequelize = require('sequelize')
const validator = require('validator')
const db = require('../config/Database')

const User = db.define(
    "user", {
    "id_user": {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    "username": {
        type: Sequelize.STRING,
        lowercase: true,
        required: true,
        unique: true
    },
    "password": {
        type: Sequelize.STRING,
        required: true,
    },
    "email": {
        type: Sequelize.STRING,
        required: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        },
        unique: true
    },
    "name": {
        type: Sequelize.STRING,
        required: true,
    },
    "phone": {
        type: Sequelize.STRING,
        required: true,
    },
    "refreshtoken": {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

module.exports = User