import Article from '../models/articleModel.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'articles' },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const createArticle = async (req, res) => {
  try {
    const { title, date, topLink, description, authorNote } = req.body;
    const file = req.file;

    let imgUrl = '';
    let public_id = '';

    if (file) {
      const result = await streamUpload(file.buffer);
      imgUrl = result.secure_url;
      public_id = result.public_id;
    }

    const newArticle = new Article({
      title,
      date,
      topLink: JSON.parse(topLink),
      description,
      img: imgUrl,
      public_id,
      authorNote,
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Create failed', error });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ _id: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, topLink, description, authorNote } = req.body;
    const file = req.file;

    let updateFields = {
      title,
      date,
      topLink: JSON.parse(topLink),
      description,
      authorNote,
    };

    if (file) {
      const result = await streamUpload(file.buffer);
      updateFields.img = result.secure_url;
      updateFields.public_id = result.public_id;
    }

    const updated = await Article.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.public_id) {
      await cloudinary.uploader.destroy(article.public_id);
    }

    await Article.findByIdAndDelete(id);
    res.status(200).json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error });
  }
};
