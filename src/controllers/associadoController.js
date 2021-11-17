import { Usuario, Associado, AssociadoTelefone } from '../models/index.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { validationResult, matchedData } from 'express-validator';

dotenv.config();

export const cadastraAssociado = async (req, res) => {
    //valida dados vindos pela requisição
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() });
        return;
    }
    const data = matchedData(req);

    let attributes = ['LOGIN'];

    try {
        //verifica se o email já está cadastrado
        const user = await Usuario.findOne({ where: { LOGIN: data.login }, attributes });
        if(user) {
            res.json({ error: true, message: 'Email já cadastrado!' });
            return;
        }

        //criptografa a senha do usuario
        const senhaHash = await bcrypt.hash(data.senha, 10);

        let novoAssociado = await Associado.create({
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
        });
        
        let novoUsuario = await Usuario.create({
            COD_ASSOCIADO: novoAssociado.COD_ASSOCIADO,
            LOGIN: data.login,
            SENHA: senhaHash,
            TIPO: process.env.ASSOCIADO
        });

        await AssociadoTelefone.create({
            COD_ASSOCIADO: novoAssociado.COD_ASSOCIADO,
            NUMERO: data.telefone,
            TIPO: data.tipo_telefone
        });

        res.status(201).redirect('/associado/lista');
    } catch(err) {
        res.status(501).json({ error: true, message: err.message });
    }
    
}

export const cadastraAssociadoGet = async (req, res) => {
    res.render('pages/cadastroAssociado');
}

export const alteraAssociado = async (req, res) => {
    //valida os parametros vindos da requisição
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() });
        return;
    }
    const data = matchedData(req);

    let { cod_associado } = req.params;

    try {
        let usuarioAssocAlterado = await Usuario.findOne({where: { COD_ASSOCIADO: cod_associado }, attributes: ['COD_USUARIO', 'LOGIN', 'SENHA']});

        const senhaHash = await bcrypt.hash(data.senha, 10);

        usuarioAssocAlterado.LOGIN = data.login;
        usuarioAssocAlterado.SENHA = senhaHash;
        await usuarioAssocAlterado.save();

        let associadoAlterado = await Associado.findByPk(cod_associado);

        associadoAlterado.NOME = data.nome;
        associadoAlterado.RAZAO_SOCIAL = data.razao_social;
        associadoAlterado.CPF_CNPJ = data.cpf_cnpj;
        associadoAlterado.LOGRADOURO = data.logradouro;
        associadoAlterado.COMPLEMENTO = data.complemento;
        associadoAlterado.BAIRRO = data.bairro;
        associadoAlterado.CIDADE = data.cidade;
        associadoAlterado.ESTADO = data.estado;
        associadoAlterado.CEP = data.cep;

        await associadoAlterado.save();
        
        let associadoTelefone = await AssociadoTelefone.findOne({ where: {COD_ASSOCIADO: cod_associado}, attributes: ['COD', 'COD_ASSOCIADO', 'NUMERO', 'TIPO'] });

        if(associadoTelefone) {
            associadoTelefone.NUMERO = data.telefone;
            associadoTelefone.TIPO = data.tipo_telefone;
            associadoTelefone.save();
        } else {
            await AssociadoTelefone.create({
                COD_ASSOCIADO: cod_associado,
                NUMERO: data.telefone,
                TIPO: data.tipo_telefone
            });
        }

        res.redirect('/associado/lista');

    } catch(err) {
        res.json({ error: true, message: err.message })
    }
}

export const alteraAssociadoGet = async(req, res) => {
    let { cod_associado } = req.params

    let associado = await Associado.findOne({ where: { COD_ASSOCIADO: cod_associado } });
    let usuario = await Usuario.findOne({ where: {COD_ASSOCIADO: cod_associado}, attributes: ['LOGIN'] });
    let associadoTelefone = await AssociadoTelefone.findOne({ where: {COD_ASSOCIADO: cod_associado}, attributes: ['NUMERO', 'TIPO'] })

    res.render('pages/alteraAssociado', { associado, usuario, associadoTelefone });
}

export const listaAssociados = async (req, res) => {
    try {
        let associados = await Associado.findAll({
            attributes: ['COD_ASSOCIADO', 'NOME', 'RAZAO_SOCIAL', 'CPF_CNPJ'],
            include: [
                { model: Usuario, attributes: ['LOGIN'] },
                { model: AssociadoTelefone, attributes: ['COD', 'NUMERO', 'TIPO'] }
            ],
        });

        res.render('pages/listaAssociados', { associados });
    } catch(err) {
        res.status(501).json({ error: true, message: err.message });
    }
}

export const deletaAssociado = async (req, res) => {
    let { cod_associado } = req.params;

    try {
        await Associado.destroy({where: { COD_ASSOCIADO: cod_associado } });
        await AssociadoTelefone.destroy({where: { COD_ASSOCIADO: cod_associado }});
        await Usuario.destroy({where: { COD_ASSOCIADO: cod_associado }});
        
        res.redirect('/associado/lista');
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}