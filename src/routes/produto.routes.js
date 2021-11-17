import express from 'express';
const router = express.Router();
import * as produtoController from '../controllers/produtoController.js';
import { Auth } from '../middlewares/auth.js';
import * as produtoValidator from '../validators/produtoValidator.js';

/* Base dessas rotas: /associado */

//lista produto
router.get('/lista', Auth.logged, produtoController.listaProdutos);

router.get('/adicionar', Auth.logged, produtoController.cadastraProdutoGet);

//cadastra produto
router.post('/adicionar', Auth.logged, produtoValidator.produto, produtoController.cadastraProduto);

//altera produto
router.post('/alterar/:cod_produto', Auth.logged, produtoValidator.produto, produtoController.alteraProduto);

router.get('/alterar/:cod_produto', Auth.logged, produtoController.alteraProdutoGet);

//deleta produto
router.get('/deletar/:cod_produto', Auth.logged, produtoController.deletaProduto);

export default router;