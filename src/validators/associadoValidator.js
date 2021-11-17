import { checkSchema } from "express-validator";

export const associado = checkSchema({
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
    telefone: {
        optional: { nullable: true, checkFalsy: true },
        isNumeric: true,
        isLength: { min: 8 },
        trim: true,
        errorMessage: 'Número de telefone/celular inválido'
    },
    tipo_telefone: {
        isLength: { min: 7, max: 8 },
        trim: true,
        errorMessage: 'Tipo telefone inválido'
    },
    login: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'E-mail inválido'
    },
    senha: {
        notEmpty: true,
        isLength: {
            options: { min: 7 }
        },
        errorMessage: 'Senha precisa ter pelo menos 7 caracteres'
    }
});