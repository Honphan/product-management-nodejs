const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storageMulter = require('../../helpers/uploadStore');
const upload = multer({ storage: storageMulter() });


const controller = require('../../controllers/admin/product.controller');
const validate = require('../../validates/admin/product.validate');

router.get('/', controller.index);
router.get('/changeStatus/:status/:id', controller.changeStatus);
router.patch('/changeStatusMulti', controller.changeStatusMulti);
router.delete('/delete/:id', controller.delete);
router.get('/create', controller.create);
router.post('/create',
         upload.single('thumbnail'),
          validate.storeProduct,
          controller.storeProduct
        );
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', controller.editPatch);

router.get('/detail/:id', controller.detail);
module.exports = router;