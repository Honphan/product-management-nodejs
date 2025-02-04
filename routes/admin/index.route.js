const productRoute = require('./product.route');
const dashboard = require('./dashboard.route');

module.exports = (app) => {
   app.use('/admin/dashboard',dashboard);
   app.use('/admin/products', productRoute);
}