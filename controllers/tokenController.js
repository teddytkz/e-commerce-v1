const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.getRefreshToken = async function (req, res) {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.sendStatus(401)
        }
        const users = await Users.findAll({
            where: {
                refreshtoken: refreshToken
            }
        })
        if (!users[0]) {
            return res.sendStatus(403)
        }
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.sendStatus(403)
                }
                const userId = users[0].id_user
                const userUsername = users[0].username
                const userName = users[0].name
                const userEmail = users[0].email
                const userPhone = users[0].phone
                const userAccessToken = jwt.sign(
                    { userId, userUsername, userName, userEmail, userPhone },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "3600s" }
                )
                res.json({ userAccessToken })
            }
        )
    } catch (err) {
        console.log(err)
        res.status(400).json("Token Error")
    }
}