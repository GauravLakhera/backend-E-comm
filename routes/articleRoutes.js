import express from 'express';
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/articleController.js';

import upload from '../middleware/multers.js';         
import adminAuth from '../middleware/adminAuth.js';     
const router = express.Router();

router.get('/', getAllArticles);

router.post('/add-article', adminAuth, upload.single('image'), createArticle);

router.put('/update-article/:id', adminAuth, upload.single('image'), updateArticle);

router.delete('/delete-article/:id', adminAuth, deleteArticle);

export default router;
