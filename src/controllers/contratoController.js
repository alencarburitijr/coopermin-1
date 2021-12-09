import { Contrato, Associado, ContratoItem, Cliente } from '../models/index.js';

import { validationResult, matchedData } from 'express-validator';

import { sequelize } from '../instances/mysql.js';
const { Op } = sequelize;

export const cadastraContrato = async (req, res) => {
    //valida dados vindos pela requisição
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() });
        return;
    }
    const data = matchedData(req);

    const desconto = (data.desconto / 100);

    try {
       let novoContrato =  await Contrato.create({
            COD_ASSOCIADO: data.cod_associado,
            COD_CLIENTE: data.cod_cliente,
            DATA_EMISSAO: data.data_emissao,
            DATA_ENTREGA: data.data_entrega,
            VALOR: data.valor,
            DESCONTO: desconto,
        });

        await ContratoItem.create({
            COD_CONTRATO: novoContrato.COD_CONTRATO,
            ITEM_CONTRATO: data.item_contrato,
        });

        res.status(201).redirect('/contrato/lista');
    } catch(err) {
        res.status(501).json({ error: true, message: err.message });
    }
    
}

export const cadastraContratoGet = async (req, res) => {
    let associados = await Associado.findAll({ attributes: ['COD_ASSOCIADO', 'NOME'] });
    let clientes = await Cliente.findAll({ attributes: ['COD_CLIENTE', 'NOME'] });

    //const associadosEClientes = { clientes, associados };

    res.render('pages/cadastroContrato', { clientes, associados } );
}

export const alteraContrato = async (req, res) => {
    //valida os parametros vindos da requisição
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() });
        return;
    }
    const data = matchedData(req);

    let { cod_contrato } = req.params;

    try {
        let contrato = await Contrato.findOne({ attributes: ['COD_CONTRATO', 'COD_ASSOCIADO', 'COD_CLIENTE', 'DATA_EMISSAO', 'DATA_ENTREGA', 'VALOR', 'DESCONTO'], where: { COD_CONTRATO: cod_contrato } });

        contrato.COD_ASSOCIADO = data.cod_contrato;
        contrato.COD_CLIENTE = data.cod_cliente;
        contrato.DATA_EMISSAO = data.data_emissao;
        contrato.DATA_ENTREGA = data.data_entrega;
        contrato.VALOR = data.valor;
        contrato.DESCONTO = data.desconto;
        await contrato.save();

        let itemContrato = await ContratoItem.findOne({ attributes: ['COD', 'COD_CONTRATO', 'ITEM_CONTRATO'], where: { COD_CONTRATO: cod_contrato } });

        itemContrato.COD_CONTRATO = cod_contrato;
        itemContrato.ITEM_CONTRATO = data.item_contrato;
        itemContrato.save();

        res.redirect('/contrato/lista');

    } catch(err) {
        res.json({ error: true, message: err.message })
    }
}

export const alteraContratoGet = async (req, res) => {
    let { cod_contrato } = req.params;

    let contrato = await Contrato.findOne({ where: { COD_CONTRATO: cod_contrato }, attributes: ['COD_CONTRATO', 'COD_ASSOCIADO', 'COD_CLIENTE', 'DATA_EMISSAO', 'DATA_ENTREGA', 'VALOR', 'DESCONTO'] });
    let itemContrato = await ContratoItem.findOne({ where: { COD_CONTRATO: cod_contrato }, attributes: ['ITEM_CONTRATO'] });

    let associados = await Associado.findAll({ attributes: ['COD_ASSOCIADO', 'NOME'] });
    let clientes = await Cliente.findAll({ attributes: ['COD_CLIENTE', 'NOME'] });    

    contrato.DESCONTO = (contrato.DESCONTO * 100);

    let matches = {associadoNome: '', clienteNome: ''}
    associados.forEach( associado => {
        if(associado.COD_ASSOCIADO === contrato.COD_ASSOCIADO) {
            matches.associadoNome = associado.NOME;
        }
    });

    clientes.forEach( cliente => {
        if(cliente.COD_CLIENTE === contrato.COD_CLIENTE) {
            matches.clienteNome = cliente.NOME;
        }
    });

    res.render('pages/alteraContrato', { contrato, matches, associados, clientes, itemContrato });
}

export const listaContratos = async (req, res) => {
    try {
        // -> testar essa query novamente depois
        // let contratos = await Contrato.findAll({
        //     attributes: ['COD_CONTRATO', 'DATA_EMISSAO', 'DATA_ENTREGA', 'VALOR', 'DESCONTO'],
        //     include: [
        //         { model: Associado  },
        //         { model: Cliente  },
        //         { model: ContratoItem },
        //     ],
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
                cad_cliente AS Cliente ON Contrato.COD_CLIENTE = Cliente.COD_CLIENTE`, 
            { model: Contrato, nest: true, raw: true, type: sequelize.QueryTypes.SELECT });

        // for(let i = 0; i <= contratos.length; i++) {
        //     contratos[i].DATA_EMISSAO = Date(contratos[i].DATA_EMISSAO);
        //     contratos[i].DATA_ENTREGA.toLocaleDateString();
        //     contratos[i].DESCONTO *= 100;
        // }

        res.render('pages/listaContratos', { contratos } );
        //res.json( contratos );
    } catch(err) {
        res.status(501).json({ error: true, message: err.message });
    }
}

export const deletaContrato = async (req, res) => {
    let { cod_contrato } = req.params;

    try {
        await Contrato.destroy({where: { COD_CONTRATO: cod_contrato } });
        await ContratoItem.destroy({where: { COD_CONTRATO: cod_contrato }});
        
        res.redirect('/contrato/lista');
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}