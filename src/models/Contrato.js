import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const Contrato = sequelize.define("Contrato", {
    COD_CONTRATO: {
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
    DATA_ENTREGA: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'contrato',
    timestamps: false
}); 