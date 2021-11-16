import { Produto } from '../models/Produto.js';

import { validationResult, matchedData } from 'express-validator';

export const cadastraProduto = async (req, res) => {
    //valida dados vindos pela requisição
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() });
        return;
    }
    const data = matchedData(req);

    try {
        await Produto.create({
            NOME: data.nome,
            DESCRICAO: data.descricao
        });

        res.status(201).redirect('/produto/lista');
    } catch(err) {
        res.status(501).json({ error: true, message: err.message });
    }
    
}

export const cadastraProdutoGet = async (req, res) => {
    res.render('pages/cadastroProduto');
}

export const alteraProduto = async (req, res) => {
    //valida os parametros vindos da requisição
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() });
        return;
    }
    const data = matchedData(req);

    let { cod_produto } = req.params;

    try {
        let produto = await Produto.findOne({where: { COD_PRODUTO: cod_produto } });

        produto.NOME = data.nome;
        produto.DESCRICAO = data.descricao;
        produto.save();

        res.redirect('/produto/lista');

    } catch(err) {
        res.json({ error: true, message: err.message })
    }
}

export const alteraProdutoGet = async(req, res) => {
    let { cod_produto } = req.params

    let produto = await Produto.findOne({ where: { COD_PRODUTO: cod_produto } });

    res.render('pages/alteraProduto', { produto });
}

export const listaProdutos = async (req, res) => {
    try {
        let produtos = await Produto.findAll();

        res.render('pages/listaProdutos', { produtos });
    } catch(err) {
        res.status(501).json({ error: true, message: err.message });
    }
}

export const deletaProduto = async (req, res) => {
    let { cod_produto } = req.params;

    try {
        await Produto.destroy({where: { COD_PRODUTO: cod_produto } });
        
        res.redirect('/produto/lista');
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}