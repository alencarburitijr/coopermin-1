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
        type: DataTypes.DATEONLY,
    },
    DATA_ENTREGA: {
        type: DataTypes.DATEONLY,
    },
    VALOR: {
        type: DataTypes.FLOAT,
    },
    DESCONTO: {
        type: DataTypes.FLOAT,
    }
}, {
    tableName: 'contrato',
    timestamps: false,
    freezeTableName: true
}); 