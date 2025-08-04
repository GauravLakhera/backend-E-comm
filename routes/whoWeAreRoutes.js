import express from 'express';
import {
  getWhoWeAre,
  createWhoWeAre,
  updateWhoWeAre,
  deleteWhoWeAre
} from '../controllers/whoWeAreController.js';
import upload from '../middleware/multers.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getWhoWeAre);
router.post('/additem', adminAuth, upload.single('image'), createWhoWeAre);
router.put('/update-item/:id', adminAuth, upload.single('image'), updateWhoWeAre);
router.delete('/delete-item/:id', adminAuth, deleteWhoWeAre);

export default router;
