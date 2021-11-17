import { checkSchema } from "express-validator";

export const produto = checkSchema({
    nome: {
        isLength: {
            options: { min: 2 }
        },
        trim: true,
        errorMessage: 'Nome do produto precisa ter pelo menos 2 caracteres'
    },
    descricao: {
        isLength: {
            options: { min: 2 }
        },
        trim: true,
        errorMessage: 'Descrição do produto precisa ter pelo menos 2 caracteres'
    }
});