import express from 'express';
const router = express.Router();
import * as produtoController from '../controllers/produtoController.js';

/*  base dessas rotas: /produtos  */

//busca todos os produtos do banco de dados
router.get('/', produtoController.buscaProdutos);

//busca os produtos de um cliente especifico
router.get('/cliente/:cod_cliente', produtoController.buscaProdutosCliente);

//busca os dados de um produto específico
router.get('/:cod_produto', produtoController.buscaProduto);

//adiciona novo produto
router.post('/produto', produtoController.adicionaProduto);

//atualiza produto
router.put('/:cod_produto', produtoController.updateProduto);

//deleta produto
router.delete('/:cod_produto', produtoController.deleteProduto);

export default router;