import Content from '../models/ProductContent.js';

const getAllproductContent = async (req, res) => {
  try {
    const contents = await Content.find();
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const createproductContent = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newContent = new Content({ title, description });
    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateproductContent = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (!updatedContent) return res.status(404).json({ message: 'Content not found' });
    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllproductContent,
  createproductContent,
  updateproductContent
};
