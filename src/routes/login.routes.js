import express from 'express';
const router = express.Router();
import * as usuarioController from '../controllers/usuarioController.js';


/* Base dessas rotas: /login */

router.post('/', usuarioController.loginSession);
router.get('/', usuarioController.loginSessionGet);
router.get('/sair', usuarioController.sair);

export default router;