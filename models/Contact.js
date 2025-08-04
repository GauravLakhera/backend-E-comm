import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  type: { type: String, required: true }, 
  label: { type: String },
  value: { type: String },
  role: { type: String }, 
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
