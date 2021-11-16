import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const Cliente = sequelize.define("Cliente", {
    COD_CLIENTE: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    NOME: {
        type: DataTypes.STRING,
    },
    RAZAO_SOCIAL: {
        type: DataTypes.STRING,
    },
    CPF_CNPJ: {
        type: DataTypes.STRING,
    },
    LOGRADOURO: {
        type: DataTypes.STRING,
    },
    COMPLEMENTO: {
        type: DataTypes.STRING,
    },
    BAIRRO: {
        type: DataTypes.STRING,
    },
    CIDADE: {
        type: DataTypes.STRING,
    },
    ESTADO: {
        type: DataTypes.STRING,
    },
    CEP: {
        type: DataTypes.STRING,
    },
    INSCRICAO_ESTADUAL: {
        type: DataTypes.STRING,
    },
    INSCRICAO_MUNICIPAL: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'cad_cliente',
    timestamps: false,
    freezeTableName: true
}); 
