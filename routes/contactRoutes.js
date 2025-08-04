import express from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getContacts);
router.post('/addcontact',adminAuth, createContact);
router.put('/updatecontact/:id',adminAuth, updateContact);
router.delete("/deletecontact/:id", adminAuth, deleteContact);

export default router;
