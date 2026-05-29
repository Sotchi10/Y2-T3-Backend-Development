import express from 'express';
import { createArticle, deleteArticle, getArticleById, getArticles, updateArticle } from '../controllers/articleController.js';

const router = express.Router();

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;
