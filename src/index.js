import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import mustache from 'mustache-express';

import routerClientes from './routes/clientes.routes.js';
import routerContratos from './routes/contratos.routes.js';
import routerPedidos from './routes/pedidos.routes.js';
import routerProdutos from './routes/produtos.routes.js';
import routerApi from './routes/api.routes.js';

dotenv.config();

const app = express();

//middlewares
app.use(cors());

app.set('port', process.env.PORT || 8000 );
app.set('view engine', 'mustache');
app.set('views', path.join(path.resolve(), 'src/views'));
app.engine('mustache', mustache());

app.use(express.json());
app.use(express.static(path.join(path.resolve(), '../public')));
app.use(express.urlencoded({extended: true}));

//routes
app.use('/api', routerApi);
app.use('/clientes', routerClientes);
app.use('/contratos', routerContratos);
app.use('/pedidos', routerPedidos);
app.use('/produtos', routerProdutos);

//404
app.use((req, res) => {
    res.status(404).json({error: true, message: 'Route not found :('});
});

app.listen(app.get('port'), () => {
    console.log('Servidor está rodando!');
});