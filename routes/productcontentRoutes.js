import express from 'express';
import ProductContentController from '../controllers/ProductContentController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', ProductContentController.getAllproductContent);
router.post('/productcontent', adminAuth, ProductContentController.createproductContent);
router.put('/update-productcontent/:id',adminAuth, ProductContentController.updateproductContent);

export default router;
