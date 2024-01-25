import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { categoryWiseProducts, createProductController, deleteProductController, getProductController, getSingleProductController, productFiltersController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from 'express-formidable';

const router = express.Router();

//product router
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

router.get('/get-product', getProductController);

router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController);

//delete single product by id
router.delete('/product-delete/:pid', requireSignIn, isAdmin, deleteProductController);

//update product
router.put('/product-update/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//product filter
router.post('/product-filters', productFiltersController);

//search product
router.get('/search/:keyword', searchProductController);

//similar products
router.get('/related-product/:pid/:cid', relatedProductController);

//category wise products
router.get('/category-wise-products/:slug', categoryWiseProducts);

export default router;