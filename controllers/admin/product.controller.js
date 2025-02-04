const Product = require('../../models/product.model.js');


module.exports.index = async (req, res) => {
    console.log(req);
    const finds = {
        deleted: false,
      };
      
      
      if (req.query.status) {
        finds.status = req.query.status;
      }
      
      
      let search = req.query.search;
      console.log('Search Query:', search);
      
      if (search) {
        finds.title = new RegExp(search, 'i');
      }


     const totalProducts = await Product.countDocuments(finds);
     console.log(totalProducts);
     const pages = Math.ceil(totalProducts / 2);
     console.log(pages);
      const pagination = {
        limit: 2,
        pages: pages,
        currentPage: parseInt(req.query.page) || 1,
      }
   
    const products = await Product.find(finds).limit(pagination.limit).skip((pagination.currentPage - 1) * pagination.limit);
   console.log(products);
    

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
