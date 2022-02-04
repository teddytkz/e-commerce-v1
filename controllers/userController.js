const Users = require('../models/userModel')

exports.getAllUser = async function (req, res) {
    try {
        const user = await Users.findAll({
            attributes: ['id_user', 'username', 'nama', 'email', 'nomor_telepon']
        })
        res.json(user)
    } catch (err) {
        console.log(err)
    }
}