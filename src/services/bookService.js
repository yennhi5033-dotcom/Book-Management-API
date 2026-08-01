import Book from '../models/bookModel.js';

// 1. Tạo sách mới
export const createBook = (data) => Book.create(data);

// 2. Lấy danh sách sách + Dùng populate để lấy full info tác giả
export const getAllBooks = async (filters = {}) => {
  return await Book.find(filters).populate('author');
};

// 3. Xem chi tiết 1 cuốn sách
export const getBookById = (id) => Book.findById(id).populate('author');

// 4. Cập nhật và Xóa
export const updateBook = (id, data) => Book.findByIdAndUpdate(id, data, { new: true });
export const deleteBook = (id) => Book.findByIdAndDelete(id);