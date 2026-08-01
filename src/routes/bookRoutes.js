import express from 'express';
import { create, getAll, getDetail, update, deleteBook } from '../controllers/bookController.js';

const router = express.Router();
router.post('/create', create);
router.get('/', getAll);
//thêm các route detail, update, delete tương tự
router.get('/:id', getDetail);
router.put('/:id', update);
router.delete('/:id', deleteBook);  

export default router;