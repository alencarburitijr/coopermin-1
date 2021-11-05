import express from 'express';
const router = express.Router();
import * as apiController from '../controllers/apiController.js';
import { Auth } from '../middlewares/auth.js';

/*  base dessas rotas: /api  */

//login mobile
router.post('/login', apiController.loginMobile);

//busca contratos de um associado
router.get('/contratos', Auth.private, apiController.buscaContratos);

//busca detalhes de um contrato de um associado
router.get('/contrato/:cod_contrato', Auth.private, apiController.buscaContrato);

//busca pedidos de um associado
router.get('/pedidos', Auth.private, apiController.buscaPedidos);

//busca detalhes de um pedido de um associado
router.get('/pedido/:cod_pedido', Auth.private, apiController.buscaPedido);

export default router;