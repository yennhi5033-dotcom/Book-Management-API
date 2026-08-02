import * as authorService from '../services/authorService.js';
// xử lý phản hồi( số stauts , dữ liệu trả về, thông báo lỗi message)
export const createAuthor = async (req, res) => {
  try {
    const author = await authorService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: "Lỗi: Kiểm tra lại dữ liệu" });
  }
};
// getAllAuthors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// getAuthorDetail
export const getAuthorDetail = async (req, res) => {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: "Lỗi: Kiểm tra lại ID" });
  }
};
// updateAuthor
export const updateAuthor = async (req, res) => {
  try {
    const author = await authorService.updateAuthor(req.params.id, req.body);
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: "Lỗi: Kiểm tra lại ID" });
  }
};
// deleteAuthor
export const deleteAuthor = async (req, res) => {
  try {
    await authorService.deleteAuthor(req.params.id);
    res.status(204).json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(400).json({ message: "Lỗi: Kiểm tra lại ID" });
  }
};



