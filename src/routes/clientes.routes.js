import express from 'express';
const router = express.Router();
import * as clienteController from '../controllers/clienteController.js';

/*  base dessas rotas: /clientes  */

//busca todos os clientes do banco de dados
router.get('/', clienteController.buscaClientes);

//busca os dados especificos de um cliente
router.get('/:cod_cliente', clienteController.buscaCliente);

//adiciona um novo cliente
router.post('/cliente', clienteController.adicionaCliente);

//edita um cliente
router.put('/:cod_cliente', clienteController.updateCliente);

//remove um cliente
router.delete('/:cod_cliente', clienteController.deleteCliente);

export default router;