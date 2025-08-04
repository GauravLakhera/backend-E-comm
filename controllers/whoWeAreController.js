import WhoWeAre from '../models/WhoWeAre.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'who-we-are' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const getWhoWeAre = async (req, res) => {
  try {
    const data = await WhoWeAre.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createWhoWeAre = async (req, res) => {
  try {
    const { subtitle, description } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'Image is required' });

    const result = await uploadToCloudinary(file.buffer);
    const newItem = new WhoWeAre({
      subtitle,
      description,
      image: result.secure_url,
      public_id: result.public_id
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateWhoWeAre = async (req, res) => {
  try {
    const { subtitle, description } = req.body;
    const item = await WhoWeAre.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    let updates = { subtitle, description };

    if (req.file) {
      if (item.public_id) await cloudinary.uploader.destroy(item.public_id);
      const result = await uploadToCloudinary(req.file.buffer);
      updates.image = result.secure_url;
      updates.public_id = result.public_id;
    }

    const updated = await WhoWeAre.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteWhoWeAre = async (req, res) => {
  try {
    const item = await WhoWeAre.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (item.public_id) await cloudinary.uploader.destroy(item.public_id);
    await item.deleteOne();

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
