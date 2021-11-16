import express, { Router } from 'express';
const router = express.Router();
import * as contratoController from '../controllers/contratoController.js';
import { Auth } from '../middlewares/auth.js';
import * as contratoValidator from '../validators/contratoValidator.js';

/* Base dessas rotas: /contrato */

//lista contratos
router.get('/lista', contratoController.listaContratos);

router.get('/adicionar', contratoController.cadastraContratoGet);

//cadastra contratos
router.post('/adicionar', contratoValidator.contrato, contratoController.cadastraContrato);

//altera contratos
router.post('/alterar/:cod_contrato', contratoValidator.contrato, contratoController.alteraContrato);

router.get('/alterar/:cod_contrato', contratoController.alteraContratoGet);

//deleta contratos
router.get('/deletar/:cod_contrato', contratoController.deletaContrato);

export default router;