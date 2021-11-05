import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const Usuario = sequelize.define("Usuario", {
    COD_USUARIO: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    COD_ASSOCIADO: {
        type: DataTypes.INTEGER,
    },
    LOGIN: {
        type: DataTypes.STRING
    },
    SENHA: {
        type: DataTypes.STRING
    },
    TIPO: {
        type: DataTypes.TINYINT
    }
}, {
    tableName: 'usuarios',
    timestamps: false
}); 
