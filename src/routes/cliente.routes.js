import express from 'express';
const router = express.Router();
import * as clienteController from '../controllers/clienteController.js';
import { Auth } from '../middlewares/auth.js';
import * as clienteValidator from '../validators/clienteValidator.js';

/* Base dessas rotas: /cliente */

//lista clientes
router.get('/lista', Auth.logged, clienteController.listaClientes);

router.get('/adicionar', Auth.logged, clienteController.cadastraClienteGet);

//cadastra cliente
router.post('/adicionar', Auth.logged, clienteValidator.cliente, clienteController.cadastraCliente);

//altera cliente
router.post('/alterar/:cod_cliente', Auth.logged, clienteValidator.cliente, clienteController.alteraCliente);

router.get('/alterar/:cod_cliente', Auth.logged, clienteController.alteraClienteGet);

//deleta cliente
router.get('/deletar/:cod_cliente', Auth.logged, clienteController.deletaCliente);

export default router;