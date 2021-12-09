import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const Anuncio = sequelize.define("Anuncio", {
    COD_ANUNCIO: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    COD_PRODUTO: {
        type: DataTypes.INTEGER,
    },
    IMG: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'anuncios',
    timestamps: false,
    freezeTableName: true
}); 

//tentar fazer associação de tabelas por aqui e nao pelo index