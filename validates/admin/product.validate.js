module.exports.storeProduct = async (req, res) => {
    if(!req.body.tilte){
        // display error message
        req.flash('success', 'Vui lòng nhập tên sản phẩm');
        res.redirect('back');
        return;
    }
    console.log("ok");
    next();
}