import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = {
    private: async (req, res, next) => {
        let success = false;

        if(req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' '); //divide o tipo de autenticacao e o token pelo espaço

            if(authType === 'Bearer') {
                try {
                    const decoded = JWT.verify(
                        token,
                        process.env.JWT_SECRET
                    );
                    
                    res.locals.userType = decoded.tipo;
                    res.locals.codUsuario = decoded.cod_usuario;
                    res.locals.codAssociado = decoded.cod_associado;

                    success = true;
                } catch(err) {
                    //não faz nada, pula para o proximo e dá nao autorizado
                }
            } else {
                res.json({ error: true, message: "Tipo de autenticação errada." });
            }
        }

        if(success) {
            next();
        } else {
            res.status(403);
            res.json({ error: true, message: "Não autorizado." });
        }
    },
    logged: async (req, res, next) => {
        if(req.session.logged) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}