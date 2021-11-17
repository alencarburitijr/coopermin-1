//import { Cliente } from '../models/Cliente.js';

import { Cliente } from '../models/Cliente.js';
import { ClienteTelefone } from '../models/ClienteTelefone.js';

import { validationResult, matchedData } from 'express-validator';

export const listaClientes = async (req, res) => {
    try {
        let clientes = await Cliente.findAll();
        res.render('pages/listaClientes', { clientes });
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}

export const buscaCliente = async (req, res) => {
    try {
        let { cod_cliente } = req.params;
        let cliente = await Cliente.findByPk(cod_cliente);
        
        if(cliente) {
            res.json({ error: false, cliente: cliente });
        } else {
            res.json({ error: true, message: 'Client not found.'});
        }
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}

export const cadastraCliente = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() });
        return;
    }
    const data = matchedData(req);

    try {
        let newClient = await Cliente.create({ 
            NOME: data.nome, 
            RAZAO_SOCIAL: data.razao_social, 
            CPF_CNPJ: data.cpf_cnpj, 
            LOGRADOURO: data.logradouro, 
            COMPLEMENTO: data.complemento, 
            BAIRRO: data.bairro, 
            CIDADE: data.cidade,
            ESTADO: data.estado, 
            CEP: data.cep, 
            INSCRICAO_ESTADUAL: data.inscricao_estadual, 
            INSCRICAO_MUNICIPAL: data.inscricao_municipal
        });

        res.status(201); //status 201 = created
        res.redirect('/cliente/lista');
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}

export const cadastraClienteGet = async (req, res) => {
    res.render('pages/cadastroCliente');
}

export const alteraCliente = async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() });
        return;
    }
    const data = matchedData(req);

    let { cod_cliente } = req.params; 

    try {
        let cliente = await Cliente.findByPk(cod_cliente);

        if(cliente) {
            cliente.NOME = data.nome;
            cliente.RAZAO_SOCIAL = data.razao_social;
            cliente.CPF_CNPJ = data.cpf_cnpj;
            cliente.LOGRADOURO = data.logradouro;
            cliente.COMPLEMENTO = data.complemento;
            cliente.BAIRRO = data.bairro;
            cliente.CIDADE = data.cidade;
            cliente.ESTADO = data.estado;
            cliente.CEP = data.cep;
            cliente.INSCRICAO_ESTADUAL = data.inscricao_estadual;
            cliente.INSCRICAO_MUNICIPAL = data.inscricao_municipal;
            
            await cliente.save();

            let clienteTelefone = await ClienteTelefone.findOne({ where: { COD_CLIENTE: cod_cliente } });

            clienteTelefone.NUMERO = data.telefone;
            clienteTelefone.TIPO = data.tipo_telefone;

            await clienteTelefone.save();

            res.redirect('/cliente/lista');
        }
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
    
}

export const alteraClienteGet = async (req, res) => {
    let { cod_cliente } = req.params;

    let cliente = await Cliente.findOne({ where: { COD_CLIENTE: cod_cliente } });
    let clienteTelefone = await ClienteTelefone.findOne({ where: { COD_CLIENTE: cod_cliente } });

    res.render('pages/alteraCliente', { cliente, clienteTelefone });
}

//implementar deleção logica posteriormente
export const deletaCliente = async (req, res) => {
    let { cod_cliente } = req.params;

    try{
        await Cliente.destroy({ where: {cod_cliente} });

        res.redirect('/cliente/lista');
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}