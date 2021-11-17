import { checkSchema } from "express-validator";

export const cliente = checkSchema({
    nome: {
        isLength: {
            options: { min: 2 }
        },
        trim: true,
        errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
    },
    razao_social: {
        isLength: {
            options: { min: 2 }
        },
        trim: true,
        errorMessage: 'Razão social precisa ter pelo menos 2 caracteres'
    },
    cpf_cnpj: {
        isNumeric: true,
        isLength: { min: 11, max: 14 },
        trim: true,
        errorMessage: 'CPF/CNPJ inválido'
    },
    logradouro: {
        isLength: {
            options: { min: 3 }
        },
        errorMessage: 'Logradouro precisa ter pelo menos 3 caracteres'
    },
    complemento: {
        optional: { nullable: true, checkFalsy: true }
    },
    bairro: {
        isLength: {
            options: { min: 2 }
        },
        errorMessage: 'Bairro precisa ter pelo menos 2 caracteres'
    },
    cidade: {
        isLength: {
            options: { min: 2 }
        },
        errorMessage: 'Cidade precisa ter pelo menos 2 caracteres'
    },
    estado: {
        isLength: {
            options: { min: 2 }
        },
        errorMessage: 'Estado precisa ter pelo menos 2 caracteres'
    },
    cep: {
        isNumeric: true,
        isLength: { min: 8, max: 8 },
        trim: true,
        errorMessage: 'CEP inválido'
    },
    inscricao_estadual: {

    },
    inscricao_municipal: {

    },
    telefone: {

    },
    tipo_telefone: {
        
    }
});