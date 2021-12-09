import express from 'express';
const router = express.Router();
import * as anuncioController from '../controllers/anuncioController.js';
import { Auth } from '../middlewares/auth.js';
import * as anuncioValidator from '../validators/anuncioValidator.js';
import multer from 'multer';

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpg', 'image/jpeg', 'image/png']

        cb(null, allowed.includes( file.mimetype ));
    }
});

/* Base dessas rotas: /anuncio */

//lista anuncio
router.get('/lista', Auth.logged,  anuncioController.listaAnuncios);

router.get('/adicionar', Auth.logged, anuncioController.cadastraAnuncioGet);

//cadastra anuncio
router.post('/adicionar', Auth.logged,  upload.single('img'), anuncioController.cadastraAnuncio);

//altera anuncio
router.post('/alterar/:cod_anuncio', Auth.logged, upload.single('img'), anuncioController.alteraAnuncio);

router.get('/alterar/:cod_anuncio', Auth.logged, anuncioController.alteraAnuncioGet);

//deleta anuncio
router.get('/deletar/:cod_anuncio', Auth.logged, anuncioController.deletaAnuncio);

export default router;