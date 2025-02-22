const Product = require('../../models/product.model.js');


module.exports.index = async (req, res) => {
   
    const finds = {
        deleted: false,
      };
      
      
      if (req.query.status) {
        finds.status = req.query.status;
      }
      
      
      let search = req.query.search;
   
      
      if (search) {
        finds.title = new RegExp(search, 'i');
      }


     const totalProducts = await Product.countDocuments(finds);
   
     const pages = Math.ceil(totalProducts / 2);
  
      const pagination = {
        limit: 2,
        pages: pages,
        currentPage: parseInt(req.query.page) || 1,
      }
   
    const products = await Product.find(finds).limit(pagination.limit).skip((pagination.currentPage - 1) * pagination.limit).sort({
       position: 'desc'
    });
   
    

    const filterStatus = [
        {
            value: '',
            name: 'Tat ca',
            class:''
        },
        {
            value: 'active',
            name: 'Hoat dong',
            class:''
        },
        {
            value: 'inactive',
            name: 'Khong hoat dong',
            class:''
        }
    ]
    if(req.query.status){
        filterStatus.forEach((item) => {
          if(item.value === req.query.status){
                item.class = 'btn-success';
          }
        }
    )}
    else filterStatus[0].class = 'btn-success';

        res.render('admin/pages/products/index',{
            products: products,
            filterStatus: filterStatus,
            search: search,
            pagination: pagination
        });
    };


module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    product.status = product.status === 'active' ? 'inactive' : 'active';
    req.flash('success', 'Cập nhật trạng thái thành công');  
    await product.save();
  
    res.redirect(req.get("Referrer"));
}

module.exports.changeStatusMulti = async (req, res) => {
   const ids = req.body.ids.split(', ');
   const status = req.body.status;
   console.log(status);
   console.log(ids);
  
      await Product.updateMany( 
        { _id: { $in: ids } },
        { $set: { status : status } });
    
   res.redirect('back');
}


//[DELETE] /admim/products/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await Product.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
  res.redirect('back');
};

module.exports.create = async (req,res) =>{
   
   res.render('admin/pages/products/create',
    {
       titlePage : 'Them moi san pham'
    }
   );
}


module.exports.storeProduct = async (req, res) => {
  req.body.thumbnail = `/uploads/${req.file.filename}`;
   const request = req.body;
   const product = new Product(request);
   await product.save();
   req.flash('success', 'Thêm mới sản phẩm thành công');
   res.redirect('/admin/products');
};

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({
    _id: id,
    deleted: false
  });
  
  res.render('admin/pages/products/edit', {
    titlePage: 'Chỉnh sửa sản phẩm',
    product: product,
  });
};
  

module.exports.editPatch = async (req, res) => {
console.log(req.body);
console.log(req.params.id)
res.send("okee");

};

module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({
    _id: id,
    deleted: false
  });
  res.render('admin/pages/products/detail', {
    titlePage: 'Chi tiết sản phẩm',
    product: product
  });
   
}
