import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const linkSchema = new Schema({
  link_name: {
    type: String,
    required: true,
  },
  link_url: {
    type: String,
    required: true,
  },
  is_sent: {
    type: Boolean,
    required: false,
    default: false,
  },
  added_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  user_phone: { type: String, required: true },
});

const LinkModel = model('Link', linkSchema);
export default LinkModel;
