import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    topLink: [
      {
        type: String,
        trim: true,
      }
    ],
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    authorNote: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Article', articleSchema);
