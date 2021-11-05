import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Contrato, ContratoItem, Pedido, PedidoItem } from '../models/index.js';
import { Usuario } from '../models/Usuario.js';
import { Sequelize } from 'sequelize';

dotenv.config();

export const loginMobile = async (req, res) => {
    if(req.body.login && req.body.senha) {
        let login = req.body.login;
        let senha = req.body.senha;

        try {
            let usuario = await Usuario.findOne({
                where: {login, senha}
            });

            if(usuario) {
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
            res.json({ error: true, message: "Erro ao consultar dados." });
        }
    } else {
        res.json({ error: true, message: "Parâmetros não encontrados." });
    }
}

//busca e retorna contratos de um associado
export const buscaContratos = async (req, res) => {
    try {
        let contratos = await Contrato.findAll({
                include: [{
                    model: ContratoItem,
                    required: true,
                    attributes: ['COD_CONTRATO', 'ITEM_CONTRATO']
                }],
                where: { COD_ASSOCIADO: res.locals.codAssociado },
            });
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
            where: { COD_CONTRATO: cod_contrato },
        });
        
        if(contrato) {
            res.json({ error: false, contrato });
        } else {
            res.json({ error: true, message: 'Contrato não encontrado'});
        }
    } catch(err) {
        res.json({ error: true, message: "Erro ao buscar contrato." });
    }
}

//busca e retorna pedidos de um associado
export const buscaPedidos = async (req, res) => {
    try {
        let pedidos = await Pedido.findAll({ 
            include: [{
                model: PedidoItem,
                required: true,
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