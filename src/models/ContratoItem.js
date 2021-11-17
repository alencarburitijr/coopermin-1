import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const ContratoItem = sequelize.define("ContratoItem", {
    COD: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    COD_CONTRATO: {
        type: DataTypes.INTEGER,
    },
    ITEM_CONTRATO: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'itens_contrato',
    timestamps: false,
    freezeTableName: true
});