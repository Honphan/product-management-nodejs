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


module.exports.detail = async (req, res) => {
    console.log('ok')
    console.log(req.params.slug);
    const product= await Product.findOne({
        slug : req.params.slug,
        deleted: false,
        status: 'active'
    });
   console.log(product);
    res.render('client/pages/products/detail',{
        title : 'Product Page',
        product: product
    });
};