import Testimonial from '../models/Testimonial.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'testimonials' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, role, text } = req.body;
    let image = '';
    let public_id = '';

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      image = uploadResult.secure_url;
      public_id = uploadResult.public_id;
    }

    const newTestimonial = new Testimonial({ name, role, text, image, public_id });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { name, role, text } = req.body;
    let updates = { name, role, text };

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      updates.image = uploadResult.secure_url;
      updates.public_id = uploadResult.public_id;
    }

    const updated = await Testimonial.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (testimonial.public_id) {
      await cloudinary.uploader.destroy(testimonial.public_id);
    }

    await testimonial.deleteOne();
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
