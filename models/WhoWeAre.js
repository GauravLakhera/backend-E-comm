import mongoose from 'mongoose';

const whoWeAreSchema = new mongoose.Schema(
  {
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('WhoWeAre', whoWeAreSchema);
