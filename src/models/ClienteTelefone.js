import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const ClienteTelefone = sequelize.define("ClienteTelefone", {
    COD: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    COD_CLIENTE: {
        type: DataTypes.INTEGER,
    },
    NUMERO: {
        type: DataTypes.STRING,
    },
    TIPO: {
        type: DataTypes.STRING, 
    }
}, {
    tableName: 'clientes_telefones',
    timestamps: false
}); 