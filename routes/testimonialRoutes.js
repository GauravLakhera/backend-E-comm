import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import upload from '../middleware/multers.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/add-testimonial',adminAuth,upload.single('image'),  createTestimonial);
router.put('/update-testimonial/:id',adminAuth, upload.single('image'), updateTestimonial);
router.delete('/delete-testimonial/:id',adminAuth, deleteTestimonial);

export default router;
