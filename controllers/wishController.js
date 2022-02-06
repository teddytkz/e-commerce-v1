const Wish = require('../models/wishModel')
const Product = require('../models/productsModel')


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
        res.status(400).json('Add Wish Failed')
    }

}

exports.getWish = async function (req, res) {
    res.json(req.user.userId)
}

exports.removeWish = async function (req, res) {

}