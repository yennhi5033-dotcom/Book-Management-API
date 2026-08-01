import * as bookService from '../services/bookService.js';

export const getAll = async (req, res) => {
  try {
    const { genre, search } = req.query;
    let query = {};

    // Xử lý Filter theo thể loại
    if (genre) query.genre = genre;

    // Xử lý Search theo tiêu đề (dùng Regex không phân biệt hoa thường)
    if (search) query.title = { $regex: search, $options: 'i' };

    const books = await bookService.getAllBooks(query);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: "Lỗi: Kiểm tra lại Author ID hoặc dữ liệu" });
  }
};

// deleteBook
export const deleteBook = async (req, res) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.status(204).json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi: Kiểm tra lại ID" });
  }
};

// getDetail
export const getDetail = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: "Lỗi: Kiểm tra lại ID" });
  }
};

// update
export const update = async (req, res) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: "Lỗi: Kiểm tra lại ID" });
  }
};

