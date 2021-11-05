import express from 'express';
const router = express.Router();
import * as pedidoController from '../controllers/pedidoController.js';

/*  base dessas rotas: /pedidos  */

//busca todos os pedidos do banco de dados
router.get('/', pedidoController.buscaTodosPedidos);

//busca os pedidos de um cliente especifico
router.get('/cliente/:cod_cliente', pedidoController.buscaPedidos);

//busca os dados de um pedido especifico
router.get('/:cod_pedido', pedidoController.buscaPedido);

//adiciona novo pedido
router.post('/pedido', pedidoController.adicionaPedido);

//atualiza pedido
router.put('/:cod_pedido', pedidoController.updatePedido);

//deleta pedido
router.delete('/:pedido', pedidoController.deletePedido);

export default router;