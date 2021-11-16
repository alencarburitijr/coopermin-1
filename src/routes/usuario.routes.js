import express from 'express';
const router = express.Router();
import * as usuarioController from '../controllers/usuarioController.js';
import { Auth } from '../middlewares/auth.js';
import * as usuarioValidator from '../validators/usuarioValidator.js';

/* Base dessas rotas: /usuario */

//faz login do usuário
router.post('/login', usuarioController.login);

//lista todos os usuários
router.get('/lista', Auth.private, usuarioController.listaUsuarios);

//cadastra funcionario
router.post('/funcionario', Auth.private, usuarioValidator.usuario, usuarioController.cadastraFuncionario);

//cadastra admin
router.post('/admin', Auth.private, usuarioValidator.usuario, usuarioController.cadastraAdmin);

//altera usuario (admin e funcionario)
router.put('/altera/:cod_usuario', Auth.private, usuarioValidator.usuario, usuarioController.alteraUsuario);

//deleta usuário
router.delete('/deletar/:cod_usuario', Auth.private, usuarioController.deletaUsuario);

export default router;