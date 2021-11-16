import { checkSchema } from "express-validator";

export const usuario = checkSchema({
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