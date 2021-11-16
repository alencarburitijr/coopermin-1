import express from 'express';
const router = express.Router();
import * as associadoController from '../controllers/associadoController.js';
import { Auth } from '../middlewares/auth.js';
import * as associadoValidator from '../validators/associadoValidator.js';

/* Base dessas rotas: /associado */

//lista associados
router.get('/lista', associadoController.listaAssociados);

router.get('/adicionar', associadoController.cadastraAssociadoGet);

//cadastra associado
router.post('/adicionar', associadoValidator.associado, associadoController.cadastraAssociado);

//altera associado
router.post('/alterar/:cod_associado', associadoValidator.associado, associadoController.alteraAssociado);

router.get('/alterar/:cod_associado', associadoController.alteraAssociadoGet);

//deleta associado
router.get('/deletar/:cod_associado', associadoController.deletaAssociado);

export default router;