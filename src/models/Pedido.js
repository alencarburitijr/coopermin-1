import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const Pedido = sequelize.define("Pedido", {
    COD_PEDIDO: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    COD_ASSOCIADO: {
        type: DataTypes.INTEGER,
    },
    DATA_EMISSAO: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'pedido',
    timestamps: false
});