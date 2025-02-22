const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storageMulter = require('../../helpers/uploadStore');
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// local
//const upload = multer({ storage: storageMulter() });
// upload cloudinary
const upload = multer();

cloudinary.config({ 
  cloud_name: 'dq5jpjdgu', 
  api_key: '739148414947843', 
  api_secret: 'OKyHzhGgsw2B0q01JY-EfX3Ln5M' // Click 'View API Keys' above to copy your API secret
});

const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares");

const controller = require('../../controllers/admin/product.controller');
const validate = require('../../validates/admin/product.validate');

router.get('/', controller.index);
router.get('/changeStatus/:status/:id', controller.changeStatus);
router.patch('/changeStatusMulti', controller.changeStatusMulti);
router.delete('/delete/:id', controller.delete);
router.get('/create', controller.create);
router.post('/create',
         upload.single('thumbnail'),
          uploadCloud.uploadCloud,
          validate.storeProduct,
          controller.storeProduct
        );
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', controller.editPatch);

router.get('/detail/:id', controller.detail);
module.exports = router;