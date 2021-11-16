//import { Usuario } from '../models/index.js';
import { Usuario } from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { validationResult, matchedData } from 'express-validator';

dotenv.config();

export const login = async (req, res) => {
    if(req.body.login && req.body.senha) {
        let login = req.body.login;
        let senha = req.body.senha;

        let attributes = ['COD_USUARIO', 'COD_ASSOCIADO', 'LOGIN', 'SENHA', 'TIPO', 'BLOQUEADO'];

        try {
            let usuario = await Usuario.findOne({ where: { login }, attributes });
            if(!usuario) {
                res.json({ error: true, message: "Usuário não encontrado." });
            }

            let matchSenha = await bcrypt.compare(senha, usuario.SENHA);
            if(!matchSenha) {
                res.json({ error: true, message: "Usuário não encontrado." });
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
            res.json({ error: true, message: err.message });
        }
    } else {
        res.json({ error: true, message: "Parâmetros não encontrados." });
    }
}

export const listaUsuarios = async (req, res) => {
    let attributes = ['COD_USUARIO', 'COD_ASSOCIADO', 'LOGIN', 'TIPO', 'BLOQUEADO'];
    try {
        let usuarios = await Usuario.findAll({
            attributes,
            //where: { BLOQUEADO: null }
        });
        res.json({ error: false, usuarios });
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}

export const cadastraFuncionario = async (req, res) => {
    //valida os parametros vindos da requisição
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() });
        return;
    }
    const data = matchedData(req);

    let attributes = ['COD_USUARIO', 'COD_ASSOCIADO', 'LOGIN', 'TIPO', 'BLOQUEADO'];

    if(res.locals.userType == process.env.ADMIN) {
        try {
            const user = await Usuario.findOne({ where: { LOGIN: data.login }, attributes });
            if(user) {
                res.json({ error: true, message: 'Email já cadastrado!' });
                return;
            }
    
            const senhaHash = await bcrypt.hash(data.senha, 10);
    
            let novoFuncionario = await Usuario.create({
                COD_ASSOCIADO: 0,
                LOGIN: data.login,
                SENHA: senhaHash,
                TIPO: process.env.FUNCIONARIO
            });
    
            res.status(201).json({
                error: false,
                user: novoFuncionario.LOGIN,
                codUsuario: novoFuncionario.COD_USUARIO
            });
        } catch(err) {
            res.status(501).json({ error: true, message: 'Erro ao cadastrar funcionário.' });
        }
    } else {
        res.status(403).json({ error: true, message: "Usuário não autorizado!" });
    }    
}

export const cadastraAdmin = async (req, res) => {
    //valida os parametros vindos da requisição
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() });
        return;
    }
    const data = matchedData(req);

    if(res.locals.userType == process.env.ADMIN) {
        let attributes = ['COD_USUARIO', 'COD_ASSOCIADO', 'LOGIN', 'TIPO', 'BLOQUEADO'];

        try {
            const user = await Usuario.findOne({ where: { LOGIN: data.login }, attributes });
            if(user) {
                res.json({ error: true, message: 'Email já cadastrado!' });
                return;
            }
    
            const senhaHash = await bcrypt.hash(data.senha, 10);
    
            let novoAdmin = await Usuario.create({
                COD_ASSOCIADO: 0,
                LOGIN: data.login,
                SENHA: senhaHash,
                TIPO: process.env.ADMIN
            });
    
            res.status(201).json({
                error: false,
                user: novoAdmin.LOGIN,
                codUsuario: novoAdmin.COD_USUARIO
            });
        } catch(err) {
            res.status(501).json({ error: true, message: 'Erro ao cadastrar Administrador.' });
        }
    } else {
        res.status(403).json({ error: true, message: "Usuário não autorizado!" });
    }
}

export const alteraUsuario = async (req, res) => {
    //valida os parametros vindos da requisição
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.mapped() });
        return;
    }
    const data = matchedData(req);

    if(res.locals.userType == process.env.ADMIN){
        let { cod_usuario } = req.params;
        let attributes = ['COD_USUARIO', 'COD_ASSOCIADO', 'LOGIN', 'SENHA', 'TIPO', 'BLOQUEADO'];

        try {
            let usuarioAlterado = await Usuario.findOne({where: { COD_USUARIO: cod_usuario }, attributes});

            if(usuarioAlterado.LOGIN === data.login) {
                res.json({ error: true, message: "E-mail já cadastrado" });
                return;
            }

            const senhaHash = await bcrypt.hash(data.senha, 10);

            usuarioAlterado.LOGIN = data.login;
            usuarioAlterado.SENHA = senhaHash;
            await usuarioAlterado.save();

            res.json({
                error: false,
                user: usuarioAlterado.LOGIN,
                cod_usuario: usuarioAlterado.COD_USUARIO
            });

        } catch(err) {
            res.json({ error: true, message: err.message });
        }
    } else {
        res.status(403).json({ error: true, message: "Usuário não autorizado!" });
    }

    
}

export const deletaUsuario = async (req, res) => {
    let { cod_usuario } = req.params;
    let attributes = ['COD_USUARIO', 'COD_ASSOCIADO', 'LOGIN', 'SENHA', 'TIPO', 'BLOQUEADO'];

    try {
        let usuarioDeletado = await Usuario.findOne({where: { COD_USUARIO: cod_usuario }, attributes });
        
        usuarioDeletado.BLOQUEADO = '1';
        await usuarioDeletado.save();

        res.json({
            error: false,
        });
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}