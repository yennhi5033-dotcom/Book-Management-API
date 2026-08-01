import Author from '../models/authorModel.js';

export const createAuthor = (data) => Author.create(data);
export const getAllAuthors = () => Author.find();
export const getAuthorById = (id) => Author.findById(id);
export const deleteAuthor = (id) => Author.findByIdAndDelete(id);
export const updateAuthor = (id, data) => Author.findByIdAndUpdate(id, data, { new: true });

