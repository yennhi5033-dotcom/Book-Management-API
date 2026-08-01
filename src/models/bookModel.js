import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, min: 0 },
  publishedYear: { type: Number, max: new Date().getFullYear() },
  genre: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Tên model tham chiếu đến
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);