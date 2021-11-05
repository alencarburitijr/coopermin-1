import express from 'express';
const router = express.Router();
import * as contratoController from '../controllers/contratoController.js';

/*  base dessas rotas: /contratos  */

//busca todos os contratos do banco de dados
router.get('/', contratoController.buscaContratos);

//busca os dados de um contrato especifico
router.get('/:cod_contrato', contratoController.buscaContrato);

//busca os contratos de um cliente especifico
router.get('/cliente/:cod_cliente', contratoController.buscaContratoPorCliente);

//adiciona novo contrato
router.post('/contrato', contratoController.adicionaContrato);

//atualiza contrato
router.put('/:cod_contrato', contratoController.updateContrato);

//deleta contrato
router.delete('/:cod_contrato', contratoController.deleteContrato);



export default router;