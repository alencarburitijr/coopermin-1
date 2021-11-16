import { checkSchema } from "express-validator";

export const contrato = checkSchema({
    cod_associado: {
        isNumeric: true,
        trim: true,
        errorMessage: 'Código do associado precisa ser numérico'
    },
    cod_cliente: {
        isNumeric: true,
        trim: true,
        errorMessage: 'Código do cliente precisa ser numérico'
    },
    data_emissao: {
        isDate: true,
        trim: true,
        errorMessage: 'Data inválida'
    },
    data_entrega: {
        isDate: true,
        trim: true,
        errorMessage: 'Data inválida'
    },
    valor: {
        isNumeric: true,
        trim: true,
        optional: true,
    },
    desconto: {
        isNumeric: true,
        trim: true,
        optional: true,
    },
    item_contrato: {
    }
});