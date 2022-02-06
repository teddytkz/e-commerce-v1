const Type = require('../models/typeModel')

exports.createType = async function (req, res) {
    const { type_name } = req.body
    try {
        const types = await Type.create({
            type_name: type_name
        })
        res.json({ msg: "Success Add Type" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'Failed Add Type' })
    }
}

exports.getAllType = async function (req, res) {
    try {
        const types = await Type.findAll()
        res.json(types)
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Get Type" })
    }
}

exports.getType = async function (req, res) {
    let id = req.params.id
    try {
        const types = await Type.findOne({
            where: {
                id_type: id
            }
        })
        res.json(types)
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Get Type" })
    }
}

exports.updateType = async function (req, res) {
    let id = req.params.id
    try {
        const types = await Type.update({
            type_name: req.body.type_name
        }, {
            where: {
                id_type: id
            }
        })
        res.json({ msg: 'Success Update Type' })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Update Type" })
    }
}

exports.deleteType = async function (req, res) {
    let id = req.params.id
    try {
        const types = await Type.destroy({
            where: {
                id_type: id
            }
        })
        res.json({ msg: "Success Delete Type" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Delete Type" })
    }
}