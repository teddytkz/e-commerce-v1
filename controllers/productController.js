const Product = require('../models/productsModel')
const Brand = require('../models/brandModel')
const Type = require('../models/typeModel')

const multer = require('multer')
const productImages = require('../models/productImagesModel')


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "xx" + file.originalname.replaceAll(" ", ""))
    }
})

exports.upload = multer({
    storage: fileStorageEngine,
})

exports.createProduct = async function (req, res) {
    const {
        product_name,
        product_description,
        id_brand,
        id_type,
        product_price,
        product_discount
    } = req.body
    const images = req.files
    let image_product = []
    let imagesProduct = []
    try {
        await Product.create({
            product_name: product_name,
            product_description: product_description,
            id_brand: id_brand,
            id_type: id_type,
            product_price: product_price,
            product_discount: product_discount
        }).then(results => {
            images.forEach((image) => {
                let image_path = image.path.replace("public\\", "")
                image_product.push({
                    id_product: results.id_product,
                    file_path: image_path
                })
                imagesProduct.push({
                    path: req.get('host') + "/" + image_path
                })
            })
        }).then(() => {
            const productimage = productImages.bulkCreate(image_product)
        }).then(() => {
            let productResult = [{
                "product_name": product_name,
                "product_description": product_description,
                "product_brand": id_brand,
                "product_type": id_type,
                "product_price": product_price,
                "product_discount": product_discount,
                "images": imagesProduct
            }]
            res.json({ msg: "Success Add Product", data: productResult })

        })
    } catch (err) {
        console.log(err)
        res.status(400).json("Failed Add Products")
    }
}

exports.getAllProduct = async function (req, res) {
    try {
        const products = await Product.findAll({
            include: [{
                model: Brand
            }, {
                model: Type
            }, {
                model: productImages
            }],
        })
        let products_arr = []
        products.forEach((result) => {
            let products_images_arr = []
            result.productimages.forEach((resultImage) => {
                products_images_arr.push({
                    path: req.get('host') + "/" + resultImage.file_path
                })
            })
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
                images: products_images_arr,
                view: result.product_view,
                wish: result.product_wish
            })
        })
        res.json(products_arr)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Get Product" })
    }
}

exports.getProduct = async function (req, res) {
    let id = req.params.id
    try {
        const products = await Product.findAll({
            include: [{
                model: Brand
            }, {
                model: Type
            }, {
                model: productImages
            }],
            where: {
                id_product: id
            }
        })
        let products_arr = []
        products.forEach((result) => {
            let products_images_arr = []
            result.productimages.forEach((resultImage) => {
                products_images_arr.push({
                    path: req.get('host') + "/" + resultImage.file_path
                })
            })
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
                images: products_images_arr,
                view: result.product_view,
                wish: result.product_wish
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
    const id = req.params.id
    const { product_name, product_price, product_discount } = req.body
    try {
        const products = Product.update({
            product_name: product_name,
            product_price: product_price,
            product_discount: product_discount
        }, {
            where: {
                id_product: id
            }
        })
        res.json({ msg: "Success Update Product" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Update Product" })
    }
}

exports.deleteProduct = async function (req, res) {
    let id = req.params.id
    try {
        const products = await Product.destroy({
            where: {
                id_product: id
            }
        })
        res.json({ msg: "Success Delete Product" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Delete Product" })
    }
}

exports.getPopularWish = async function (req, res) {
    try {
        const products = await Product.findAll({
            include: [{
                model: Brand
            }, {
                model: Type
            }, {
                model: productImages
            }],
            order: [
                ['product_wish', 'desc']
            ]
        })
        let products_arr = []
        products.forEach((result) => {
            let products_images_arr = []
            result.productimages.forEach((resultImage) => {
                products_images_arr.push({
                    path: req.get('host') + "/" + resultImage.file_path
                })
            })
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
                images: products_images_arr,
                view: result.product_view,
                wish: result.product_wish
            })
        })
        res.json(products_arr)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Get Product" })
    }
}

exports.getPopularView = async function (req, res) {
    try {
        const products = await Product.findAll({
            include: [{
                model: Brand
            }, {
                model: Type
            }, {
                model: productImages
            }],
            order: [
                ['product_view', 'desc']
            ]
        })
        let products_arr = []
        products.forEach((result) => {
            let products_images_arr = []
            result.productimages.forEach((resultImage) => {
                products_images_arr.push({
                    path: req.get('host') + "/" + resultImage.file_path
                })
            })
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
                images: products_images_arr,
                view: result.product_view,
                wish: result.product_wish
            })
        })
        res.json(products_arr)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Failed Get Product" })
    }
}
