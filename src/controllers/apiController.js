import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import { Contrato, ContratoItem, Pedido, PedidoItem, Usuario, Associado, Cliente } from '../models/index.js';
//import { Usuario } from '../models/Usuario.js';
import { sequelize } from '../instances/mysql.js';
dotenv.config();

export const loginMobile = async (req, res) => {
    if(req.body.login && req.body.senha) {
        let login = req.body.login;
        let senha = req.body.senha;

        try {
            let usuario = await Usuario.findOne({ where: { LOGIN: login }, attributes: ['COD_ASSOCIADO', 'LOGIN', 'SENHA', 'TIPO', 'BLOQUEADO'] });
            if(!usuario) {
                res.json({ error: true, message: "Usuário não encontrado usuario." });
                return;
            }

            let matchSenha = await bcrypt.compare(senha, usuario.SENHA);
            if(!matchSenha) {
                res.json({ error: true, message: "Usuário não encontrado senha." });
                return;
            }

            if(usuario && matchSenha) {
                const token = JWT.sign(
                    { cod_usuario: usuario.COD_USUARIO, cod_associado: usuario.COD_ASSOCIADO, login: usuario.LOGIN, tipo: usuario.TIPO },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                );

                res.json({ error: false, user: usuario.LOGIN, cod_usuario: usuario.COD_USUARIO, token });
            } else {
                res.json({ error: true, message: "Usuário não encontrado." });
            }
        } catch(err) {
            res.json({ error: true, message: "Erro ao buscar informações." });
        }
    } else {
        res.json({ error: true, message: "Parâmetros não encontrados." });
    }
}

//busca e retorna contratos de um associado
export const buscaContratos = async (req, res) => {
    try {
        // let contratos = await Contrato.findAll({
        //     include: [{
        //         model: ContratoItem,
        //         required: true,
        //         attributes: ['COD', 'COD_CONTRATO', 'ITEM_CONTRATO']
        //     }],
        //     where: { COD_ASSOCIADO: res.locals.codAssociado}, attributes: ['COD_CONTRATO', 'COD_ASSOCIADO', 'COD_CLIENTE', 'DATA_EMISSAO', 'DATA_ENTREGA', 'VALOR', 'DESCONTO']
        // });

        const contratos = await sequelize.query(
            `SELECT 
                Contrato.COD_CONTRATO,
                Contrato.COD_ASSOCIADO,
                Contrato.COD_CLIENTE,
                Contrato.DATA_EMISSAO,
                Contrato.DATA_ENTREGA,
                Contrato.VALOR,
                Contrato.DESCONTO,
                ContratoItems.ITEM_CONTRATO,
                Associado.NOME AS NOME_ASSOCIADO,
                Associado.RAZAO_SOCIAL AS RS_ASSOCIADO,
                Cliente.NOME AS NOME_CLIENTE,
                Cliente.RAZAO_SOCIAL AS RS_CLIENTE
            FROM 
                contrato AS Contrato
            LEFT OUTER JOIN 
                itens_contrato AS ContratoItems ON Contrato.COD_CONTRATO = ContratoItems.COD_CONTRATO 
            LEFT OUTER JOIN 
                cad_associado AS Associado ON Contrato.COD_ASSOCIADO = Associado.COD_ASSOCIADO 
            LEFT OUTER JOIN 
                cad_cliente AS Cliente ON Contrato.COD_CLIENTE = Cliente.COD_CLIENTE
            WHERE
                Contrato.COD_ASSOCIADO = ${res.locals.codAssociado}`, 
            { model: Contrato, nest: true, raw: true, type: sequelize.QueryTypes.SELECT });

        res.json({ error: false, contratos });
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}

//busca e retorna detalhes de um contrato de um associado
export const buscaContrato = async (req, res) => {
    try {
        let { cod_contrato } = req.params;
        let contrato = await Contrato.findOne({
            include: [{
                model: ContratoItem,
                required: true,
                attributes: ['COD_CONTRATO', 'ITEM_CONTRATO']
            }],
            where: { COD_CONTRATO: cod_contrato }, attributes: ['COD_CONTRATO', 'COD_ASSOCIADO', 'COD_CLIENTE', 'DATA_EMISSAO', 'DATA_ENTREGA', 'VALOR', 'DESCONTO']
        });
        
        if(contrato) {
            res.json({ error: false, contrato });
        } else {
            res.json({ error: true, message: 'Contrato não encontrado'});
        }
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}

//busca e retorna pedidos de um associado
export const buscaPedidos = async (req, res) => {
    try {
        let pedidos = await Pedido.findAll({ 
            include: [{
                model: PedidoItem,
                required: false,
                attributes: ['PRODUTO', 'QTD', 'PRECO_UND', 'PRECO_TOTAL', 'UNIDADE']
            }],
            where: { COD_ASSOCIADO: res.locals.codAssociado },
         });
        res.json({ error: false, pedidos });
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}

//busca e retorna detalhes de um pedido de um associado
export const buscaPedido = async (req, res) => {
    try {
        let { cod_pedido } = req.params;
        let pedido = await Pedido.findOne({ 
            include: [{
                model: PedidoItem,
                required: true,
                //raw: true,
                attributes: ['PRODUTO', 'QTD', 'PRECO_UND', 'PRECO_TOTAL', 'UNIDADE']
            }],
            where: { COD_PEDIDO: cod_pedido },
         });
        
        if(pedido) {
            res.json({ error: false, pedido });
        } else {
            res.json({ error: true, message: 'Pedido não encontrado'});
        }
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}