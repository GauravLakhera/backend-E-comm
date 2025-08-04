import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  image: {
    type: String,   
    required: true
  },
  public_id: {
    type: String,   
    required: false
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
