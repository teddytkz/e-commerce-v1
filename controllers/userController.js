const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.getAllUser = async function (req, res) {
    try {
        const user = await Users.findAll({
            attributes: ['id_user', 'username', 'name', 'email', 'phone']
        })
        res.json(user)
    } catch (err) {
        console.log(err)
    }
}

exports.postRegister = async function (req, res) {
    const { username, password, confpassword, email, name, phone } = req.body
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
            name: name,
            phone: phone
        })
        res.json({ msg: "Register Success" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Regiter Failed " + err })
    }
}

exports.postLogin = async function (req, res) {
    try {
        const user = await Users.findAll({
            limit: 1,
            where: {
                username: req.body.username
            }
        })
        const matchPassword = await bcrypt.compare(req.body.password, user[0].password)
        if (!matchPassword) {
            return res.status(400).json({ msg: "Wrong Password" })
        }
        const token = await getToken(user)
        const usersAccessToken = token['accessToken']
        const usersRefreshToken = token['refreshToken']
        await updateToken(user[0].id_user, usersRefreshToken)
        res.cookie("refreshToken", usersRefreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: false,
        })
        res.json({ usersAccessToken })
    } catch (err) {
        res.status(404).json({ msg: "Username Not Valid" + err })
    }
}

function getToken(userData) {
    const userId = userData[0].id_user
    const userUsername = userData[0].username
    const userName = userData[0].name
    const userEmail = userData[0].email
    const userPhone = userData[0].phone

    const userAccessToken = jwt.sign(
        { userId, userUsername, userName, userEmail, userPhone },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20s" }
    )

    const userRefreshToken = jwt.sign(
        { userId, userUsername, userName, userEmail, userPhone },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    )

    const token = {
        "accessToken": userAccessToken,
        "refreshToken": userRefreshToken
    }

    return token
}

function updateToken(id_user, refreshToken) {
    User.update(
        { refreshtoken: refreshToken },
        {
            where: {
                id_user: id_user
            }
        })
}

