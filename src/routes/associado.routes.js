import express from 'express';
const router = express.Router();
import * as associadoController from '../controllers/associadoController.js';
import { Auth } from '../middlewares/auth.js';
import * as associadoValidator from '../validators/associadoValidator.js';

/* Base dessas rotas: /associado */

//lista associados
router.get('/lista', Auth.logged, associadoController.listaAssociados);

router.get('/adicionar', Auth.logged, associadoController.cadastraAssociadoGet);

//cadastra associado
router.post('/adicionar', Auth.logged, associadoValidator.associado, associadoController.cadastraAssociado);

//altera associado
router.post('/alterar/:cod_associado', Auth.logged, associadoValidator.associado, associadoController.alteraAssociado);

router.get('/alterar/:cod_associado', Auth.logged, associadoController.alteraAssociadoGet);

//deleta associado
router.get('/deletar/:cod_associado', Auth.logged, associadoController.deletaAssociado);

export default router;