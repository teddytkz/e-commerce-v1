const Users = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.getAllUser = async function (req, res) {
    try {
        const user = await Users.findAll({
            attributes: ['id_user', 'username', 'nama', 'email', 'phone']
        })
        res.json(user)
    } catch (err) {
        console.log(err)
    }
}

exports.postRegister = async function (req, res) {
    const { username, password, confpassword, email, nama, phone } = req.body
    if (password != confpassword) {
        return res.status(400).json({ msg: "Password and Confirm Password Not Match" })
    }
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await Users.create({
            username: username,
            password: hashPassword,
            email: email,
            nama: nama,
            phone: phone
        })
        res.json({ msg: "Register Success" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Regiter Failed" + err })
    }
}