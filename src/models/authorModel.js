import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  nationality: String,
  birthYear: Number
}, { timestamps: true });

export default mongoose.model('Author', authorSchema);