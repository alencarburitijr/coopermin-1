import express from 'express';
const router = express.Router();
import * as produtoController from '../controllers/produtoController.js';
import { Auth } from '../middlewares/auth.js';
import * as produtoValidator from '../validators/produtoValidator.js';

/* Base dessas rotas: /associado */

//lista produto
router.get('/lista', produtoController.listaProdutos);

router.get('/adicionar', produtoController.cadastraProdutoGet);

//cadastra produto
router.post('/adicionar', produtoValidator.produto, produtoController.cadastraProduto);

//altera produto
router.post('/alterar/:cod_produto', produtoValidator.produto, produtoController.alteraProduto);

router.get('/alterar/:cod_produto', produtoController.alteraProdutoGet);

//deleta produto
router.get('/deletar/:cod_produto', produtoController.deletaProduto);

export default router;