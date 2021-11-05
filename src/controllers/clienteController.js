import { Cliente } from '../models/Cliente.js';

export const buscaClientes = async (req, res) => {
    try {
        let clientes = await Cliente.findAll();
        res.json({ error: false, clientes });
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

export const adicionaCliente = async (req, res) => {
    if(req.body) { //verifica se os parametros existem. Implementar verficação se todos os campos estão preenchidos, posteriormente.
        let { nome, razao_social, cpf_cnpj, logradouro, complemento, bairro, cidade, estado, 
            cep, inscricao_estadual, inscricao_municipal } = req.body;

        try {
            let newClient = await Cliente.create({ NOME: nome, RAZAO_SOCIAL: razao_social, CPF_CNPJ: cpf_cnpj, LOGRADOURO: logradouro, COMPLEMENTO: complemento, BAIRRO: bairro, CIDADE: cidade,
                 ESTADO: estado, CEP: cep, INSCRICAO_ESTADUAL: inscricao_estadual, INSCRICAO_MUNICIPAL: inscricao_municipal });
    
            res.status(201); //status 201 = created
            res.json({ cod_cliente: newClient.COD_CLIENTE, nome: newClient.NOME });
        } catch(err) {
            res.json({ error: true, message: err.message });
        }
    } else {
        res.json({ error: true, message: 'Missing parameters.' });
    }
}

export const updateCliente = async (req, res) => {
    if(req.params && req.body) {
        let { cod_cliente } = req.params;
        let { nome, razao_social, cpf_cnpj, logradouro, complemento, bairro, cidade, estado, 
            cep, inscricao_estadual, inscricao_municipal } = req.body;

        try {
            let client = await Cliente.findByPk(cod_cliente);

            if(client) {
                client.NOME = nome;
                client.RAZAO_SOCIAL = razao_social;
                client.CPF_CNPJ = cpf_cnpj;
                client.LOGRADOURO = logradouro;
                client.COMPLEMENTO = complemento;
                client.BAIRRO = bairro;
                client.CIDADE = cidade;
                client.ESTADO = estado;
                client.CEP = cep;
                client.INSCRICAO_ESTADUAL = inscricao_estadual;
                client.INSCRICAO_MUNICIPAL = inscricao_municipal;
                
                await client.save();

                res.json({ error: false, cod_cliente: cod_cliente});
            }
        } catch(err) {
            res.json({ error: true, message: err.message });
        }
    }
}

//implementar deleção logica posteriormente
export const deleteCliente = async (req, res) => {
    try{
        let { cod_cliente } = req.params;

        await Cliente.destroy({ where: {cod_cliente} });

        res.json({ error: false, cod_cliente_excluido: cod_cliente });
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}