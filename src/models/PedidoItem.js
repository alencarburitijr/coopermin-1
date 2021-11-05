import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const PedidoItem = sequelize.define("PedidoItem", {
    COD: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    COD_PEDIDO: {
        type: DataTypes.INTEGER,
    },
    PRODUTO: {
        type: DataTypes.STRING
    },
    QTD: {
        type: DataTypes.FLOAT
    },
    PRECO_UND: {
        type: DataTypes.FLOAT
    },
    PRECO_TOTAL: {
        type: DataTypes.FLOAT
    },
    UNIDADE: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'itens_pedido',
    timestamps: false
});