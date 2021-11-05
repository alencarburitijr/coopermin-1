import { Contrato } from '../models/Contrato.js';

export const buscaContratos = (req, res) => {
    res.render('contratos', {
        user: 'Cebolinha',
        age: '11'
    });

    //res.json({ error: false, inicio: 'todos os contratos do bd'});
}

export const buscaContrato = (req, res) => {
    res.json({ error: false, params: req.params.cod_contrato});
}

export const buscaContratoPorCliente = (req, res) => {
    res.json({ error: false, params: req.params.cod_cliente});
}

export const adicionaContrato = (req, res) => {
    res.json({ error: false, params: req.params.cod_cliente});
}

export const updateContrato = (req, res) => {
    res.json({ error: false, params: req.params.cod_cliente});
}

export const deleteContrato = (req, res) => {
    res.json({ error: false, params: req.params.id_cliente});
}