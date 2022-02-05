const Product = require('../models/productsModel')
const Brand = require('../models/brandModel')
const Type = require('../models/typeModel')

exports.getAllProduct = async function (req, res) {
    try {
        const products = await Product.findAll({
            include: [{
                model: Brand
            }, {
                model: Type
            }],
        })
        let products_arr = []
        products.forEach((result) => {
            products_arr.push({
                id: result.id_product,
                name: result.product_name,
                description: result.product_description,
                brand_id: result.brand.id_brand,
                brand_name: result.brand.brand_name,
                type_id: result.type.id_type,
                type_name: result.type.type_name,
                price: result.product_price,
                discount: result.product_discount,
                images: result.product_images,
                view: result.product_view
            })
            Product.update({
                product_view: parseInt(result.product_view) + 1
            }, {
                where: {
                    id_product: result.id_product
                }
            })
        })
        res.json(products_arr)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Get Product" })
    }
}

exports.createProduct = async function (req, res) {
    const {
        product_name,
        product_description,
        id_brand,
        id_type,
        product_price,
        product_discount,
        product_images,
    } = req.body
}

exports.getProduct = async function (req, res) {
    let id = req.params.id
    try {
        const products = await Product.findAll({
            include: [{
                model: Brand
            }, {
                model: Type
            }],
            where: {
                id_product: id
            }
        })
        let products_arr = []
        products.forEach((result) => {
            products_arr.push({
                id: result.id_product,
                name: result.product_name,
                description: result.product_description,
                brand_id: result.brand.id_brand,
                brand_name: result.brand.brand_name,
                type_id: result.type.id_type,
                type_name: result.type.type_name,
                price: result.product_price,
                discount: result.product_discount,
                images: result.product_images,
                view: result.product_view
            })
            Product.update({
                product_view: parseInt(result.product_view) + 1
            }, {
                where: {
                    id_product: result.id_product
                }
            })
        })
        res.json(products_arr)
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Get Product" })
    }
}

exports.updateProduct = async function (req, res) {

}

exports.deleteProduct = async function (req, res) {

}

