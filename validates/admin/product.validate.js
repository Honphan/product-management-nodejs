module.exports.storeProduct = async (req, res,next) => {
    
    if(!req.body.title){
        // display error message
        console.log("ok");
        req.flash('success', 'Vui lòng nhập tên sản phẩm');
        res.redirect('back');
        return;
    }
    console.log("ok");
    next();
}