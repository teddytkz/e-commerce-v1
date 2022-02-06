const Wish = require('../models/wishModel')
const Product = require('../models/productsModel')
const Brand = require('../models/brandModel')
const Type = require('../models/typeModel')


exports.addWish = async function (req, res) {
    const { id_product } = req.body
    const id_user = req.user.userId
    try {
        const wishs = await Wish.create({
            id_user: id_user,
            id_product: id_product,
        }).then(async (result) => {
            const products = await Product.findOne({
                attributes: ['product_wish']
            }, {
                where: {
                    id_product: id_product
                }
            })
            const updateProductWish = await Product.update({
                product_wish: parseInt(products.product_wish) + 1
            }, {
                where: {
                    id_product: id_product
                }
            })
            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'Add Wish Failed' })
    }

}

exports.getWish = async function (req, res) {
    const id_user = req.user.userId
    try {
        const wishs = await Wish.findAll({
            include: [{
                model: Product,
                include: [{
                    model: Brand
                }, {
                    model: Type
                }]
            }],
            where: {
                id_user: id_user
            }
        })
        res.json(wishs)
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'Get Wish Failed' })
    }
}

exports.removeWish = async function (req, res) {
    const { id_wish } = req.body
    try {
        const wishs = await Wish.findOne({
            where: {
                id_wish: id_wish
            }
        }).then(async (result) => {
            const products = await Product.findOne({
                attributes: ['product_wish']
            }, {
                where: {
                    id_product: result.id_product
                }
            })
            const updateProductWish = await Product.update({
                product_wish: parseInt(products.product_wish) - 1
            }, {
                where: {
                    id_product: result.id_product
                }
            })
        }).then(() => {
            const wishs = Wish.destroy({
                where: {
                    id_wish: id_wish
                }
            })
            res.json({ msg: "Remove Wish Success" })
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'Remove Wish Failed' })
    }
}