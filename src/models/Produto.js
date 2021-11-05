import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const Produto = sequelize.define("Produto", {
    COD_PRODUTO: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    NOME: {
        type: DataTypes.INTEGER,
    },
    UNIDADE: {
        type: DataTypes.DATE,
    },
    PRECO: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'produto',
    timestamps: false
}); 
