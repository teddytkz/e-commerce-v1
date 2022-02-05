const Brand = require('../models/brandModel')

exports.createBrand = async function (req, res) {
    const { brand_name } = req.body
    try {
        const brands = await Brand.create({
            brand_name: brand_name
        })
        res.json({ msg: "Success Add Brand" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failer Add Brand" })
    }
}

exports.getAllBrand = async function (req, res) {
    try {
        const brands = await Brand.findAll()
        res.json(brands)
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Get Brand" })
    }
}

exports.getBrand = async function (req, res) {
    let id = req.params.id
    try {
        const brands = await Brand.findById(id)
        res.json(brands)
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Get Brand" })
    }
}

exports.updateBrand = async function (req, res) {
    let id = req.params.id
    try {
        const brands = await Brand.update({
            brand_name: req.body.brand_name
        }, {
            where: {
                id_brand: id
            }
        })
        res.json({ msg: 'Success Update Brand' })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Update Brand" })
    }
}

exports.deleteBrand = async function (req, res) {
    let id = req.params.id
    try {
        const brands = await Brand.destroy({
            where: {
                id_brand: id
            }
        })
        res.json({ msg: "Success Delete Brand" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Delete Brand" })
    }
}