const Product = require('../../models/product.model.js');

module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false,
        status: 'active'
    });
    console.log(products);
    res.render('client/pages/products/index',{
        title : 'Product Page',
        products: products
    });
};