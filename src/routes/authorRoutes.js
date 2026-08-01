    import express from 'express';
    import { createAuthor, getAllAuthors, getAuthorDetail, deleteAuthor, updateAuthor } from '../controllers/authorController.js';      
    const router = express.Router();
    router.post('/create',createAuthor);
    router.get('/', getAllAuthors);
    router.get('/:id', getAuthorDetail);
    router.put('/:id', updateAuthor);
    router.delete('/:id', deleteAuthor);   
    
    export default router;