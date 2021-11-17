import express from 'express';
const router = express.Router();
import { Auth } from '../middlewares/auth.js';

/* Base dessas rotas: / */

router.get('/', Auth.logged, (req, res) => {
    res.render('pages/paginaInicial');
});

export default router;