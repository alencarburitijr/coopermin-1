import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import mustache from 'mustache-express';

import routerApi from './routes/api.routes.js';
import routerUsuario from './routes/usuario.routes.js';
import routerAssociado from './routes/associado.routes.js';
import routerContrato from './routes/contrato.routes.js';
import routerProduto from './routes/produto.routes.js';

dotenv.config();

const app = express();

//middlewares
app.use(cors());

app.set('port', process.env.PORT || 8000 );
app.set('view engine', 'mustache');
app.set('views', path.join(path.resolve(), 'src/views'));
app.engine('mustache', mustache());

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//routes
app.use('/api', routerApi);
app.use('/usuario', routerUsuario);
app.use('/associado', routerAssociado);
app.use('/contrato', routerContrato);
app.use('/produto', routerProduto);

//página inicial
app.use('/', (req, res) => {
    res.render('pages/paginaInicial');
});

//404
app.use((req, res) => {
    res.status(404).json({error: true, message: 'Rota não encontrada.'});
});

app.listen(app.get('port'), () => {
    console.log('Servidor está rodando!');
});